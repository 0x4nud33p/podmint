"use client";

import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RecordingControls from "@/components/recording/RecordingControls";
import ParticipantTile from "@/components/recording/ParticipantTile";
import GuestInvite from "@/components/recording/GuestInvite";
import { toast } from "@/hooks/use-toast";
import { createPeerConnection } from "@/utils/webrtc";
import { socket } from "@/utils/signaling";

interface Participant {
  id: string;
  name: string;
  stream: MediaStream;
  isHost?: boolean;
  isMuted: boolean;
}

const RecordingStudio: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [recordingTime, setRecordingTime] = useState("00:00");
  const [showInvite, setShowInvite] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        localStreamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Add host to participants
        setParticipants((prev) => [
          ...prev,
          {
            id: "host",
            name: "You (Host)",
            stream,
            isHost: true,
            isMuted: false,
          },
        ]);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Media Error",
          description: "Failed to access camera and microphone",
        });
      }
    };

    initializeMedia();

    socket.on("connect", () => {
      socket.emit("join", "room1");
    });

    socket.on("user-joined", async (userId: string) => {
      const pc = createPeerConnection(handleRemoteTrack);
      pcRef.current = pc;

      localStreamRef.current?.getTracks().forEach((track) => {
        pc.addTrack(track, localStreamRef.current!);
      });

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      socket.emit("signal", {
        room: "room1",
        target: userId,
        data: { offer },
      });
    });

    socket.on("signal", async ({ data, senderId }) => {
      if (!pcRef.current) {
        const pc = createPeerConnection(handleRemoteTrack);
        pcRef.current = pc;
      }

      if (data.offer) {
        await pcRef.current.setRemoteDescription(data.offer);
        const answer = await pcRef.current.createAnswer();
        await pcRef.current.setLocalDescription(answer);

        socket.emit("signal", {
          room: "room1",
          target: senderId,
          data: { answer },
        });
      }

      if (data.answer) {
        await pcRef.current.setRemoteDescription(data.answer);
      }

      if (data.candidate) {
        await pcRef.current.addIceCandidate(data.candidate);
      }
    });

    return () => {
      socket.off("connect");
      socket.off("user-joined");
      socket.off("signal");
      stopRecording();
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
      pcRef.current?.close();
    };
  }, []);

  const handleRemoteTrack = (event: RTCTrackEvent) => {
    const remoteStream = event.streams[0];

    setParticipants((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        name: "Guest",
        stream: remoteStream,
        isMuted: false,
      },
    ]);
  };

  const startRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
    let seconds = 0;

    timerRef.current = setInterval(() => {
      seconds++;
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      setRecordingTime(
        `${mins.toString().padStart(2, "0")}:${secs
          .toString()
          .padStart(2, "0")}`
      );
    }, 1000);

    toast({
      title: "Recording started",
      description: "Your session is now being recorded",
    });
  };

  const pauseRecording = () => {
    if (isPaused) {
      setIsPaused(false);
      startRecording();
    } else {
      setIsPaused(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      toast({
        title: "Recording paused",
      });
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime("00:00");
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    toast({
      title: "Recording stopped",
      description: "Your recording is being processed",
    });
  };

  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);

    localStreamRef.current?.getAudioTracks().forEach((track) => {
      track.enabled = !newMuteState;
    });

    toast({
      title: newMuteState ? "Microphone muted" : "Microphone activated",
    });
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Recording Studio</h1>
        </div>

        <Dialog open={showInvite} onOpenChange={setShowInvite}>
          <DialogTrigger asChild>
            <Button>Invite Guest</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <GuestInvite
              sessionId="demo123"
              onClose={() => setShowInvite(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <Tabs defaultValue="video" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="video" className="flex-1">
                Video
              </TabsTrigger>
              <TabsTrigger value="audio" className="flex-1">
                Audio Only
              </TabsTrigger>
            </TabsList>

            <TabsContent value="video" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative w-full h-full rounded-lg overflow-hidden border shadow">
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/50 text-white text-sm px-2 py-1 rounded">
                    You (Host)
                  </div>
                </div>

                {participants
                  .filter((p) => !p.isHost)
                  .map((participant) => (
                    <ParticipantTile
                      key={participant.id}
                      name={participant.name}
                      isSpeaking={!participant.isMuted}
                      isMuted={participant.isMuted}
                      isHost={participant.isHost}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="audio" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex flex-col items-center justify-center p-8 bg-muted rounded-lg"
                  >
                    <div className="audio-wave mb-4">
                      {[3, 5, 8, 12, 8, 5, 3].map((height, i) => (
                        <div
                          key={i}
                          className="audio-wave-bar animate-wave"
                          style={{
                            height: `${height * 3}px`,
                            animationDelay: `${i * 0.1}s`,
                            opacity: participant.isMuted ? 0.3 : 1,
                          }}
                        />
                      ))}
                    </div>
                    <p className="font-semibold">{participant.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {participant.isMuted ? "Muted" : "Speaking"}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <div className="bg-card p-4 rounded-lg border shadow-sm">
            <h3 className="font-semibold mb-4">Recording Options</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Local Recording</p>
                <p className="text-xs text-muted-foreground">
                  Recording to your device
                </p>
                <div className="flex items-center mt-1">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isRecording ? "bg-green-500" : "bg-muted"
                    }`}
                  ></span>
                  <span className="text-xs ml-2">
                    {isRecording ? "Active" : "Ready"}
                  </span>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium">Cloud Recording</p>
                <p className="text-xs text-muted-foreground">
                  Recording to cloud storage
                </p>
                <div className="flex items-center mt-1">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isRecording ? "bg-green-500" : "bg-muted"
                    }`}
                  ></span>
                  <span className="text-xs ml-2">
                    {isRecording ? "Active" : "Ready"}
                  </span>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium">Separate Tracks</p>
                <p className="text-xs text-muted-foreground">
                  Each participant on separate audio track
                </p>
                <div className="flex items-center mt-1">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  <span className="text-xs ml-2">Enabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-20 md:bottom-6 left-0 right-0 flex justify-center">
        <RecordingControls
          isRecording={isRecording}
          isPaused={isPaused}
          isMuted={isMuted}
          recordingTime={recordingTime}
          onStartRecording={startRecording}
          onPauseRecording={pauseRecording}
          onStopRecording={stopRecording}
          onToggleMute={toggleMute}
          onInviteGuest={() => setShowInvite(true)}
          className="bg-background/80 backdrop-blur-sm border rounded-full px-6 py-4 shadow-lg"
        />
      </div>
    </>
  );
};

export default RecordingStudio;
