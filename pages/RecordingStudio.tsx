
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import RecordingControls from "@/components/recording/RecordingControls";
import ParticipantTile from "@/components/recording/ParticipantTile";
import GuestInvite from "@/components/recording/GuestInvite";
import { toast } from "@/hooks/use-toast";

const RecordingStudio: React.FC = () => {
  const [isRecording, setIsRecording] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [recordingTime, setRecordingTime] = React.useState("00:00");
  const [showInvite, setShowInvite] = React.useState(false);
  
  const startRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
    // Simulate a timer
    let seconds = 0;
    const interval = setInterval(() => {
      seconds++;
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      setRecordingTime(`${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`);
    }, 1000);
    
    // Store interval ID in ref for cleanup
    (window as any).recordingInterval = interval;
    
    toast({
      title: "Recording started",
      description: "Your session is now being recorded",
    });
  };
  
  const pauseRecording = () => {
    if (isPaused) {
      // Resume
      setIsPaused(false);
      // Restart the timer...
      toast({
        title: "Recording resumed",
      });
    } else {
      // Pause
      setIsPaused(true);
      // Pause the timer...
      clearInterval((window as any).recordingInterval);
      toast({
        title: "Recording paused",
      });
    }
  };
  
  const stopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime("00:00");
    clearInterval((window as any).recordingInterval);
    
    toast({
      title: "Recording stopped",
      description: "Your recording is being processed",
    });
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Microphone activated" : "Microphone muted",
    });
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link to="/">
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
            <GuestInvite sessionId="demo123" onClose={() => setShowInvite(false)} />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <Tabs defaultValue="video" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="video" className="flex-1">Video</TabsTrigger>
              <TabsTrigger value="audio" className="flex-1">Audio Only</TabsTrigger>
            </TabsList>
            
            <TabsContent value="video" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ParticipantTile
                  name="You (Host)"
                  isSpeaking={!isMuted}
                  isMuted={isMuted}
                  isHost={true}
                />
                <ParticipantTile
                  name="Jane Smith"
                  avatarUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
                  isSpeaking={true}
                  isMuted={false}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="audio" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center p-8 bg-muted rounded-lg">
                  <div className="audio-wave mb-4">
                    {[3, 5, 8, 12, 8, 5, 3].map((height, i) => (
                      <div 
                        key={i}
                        className="audio-wave-bar animate-wave" 
                        style={{ 
                          height: `${height * 3}px`,
                          animationDelay: `${i * 0.1}s`,
                          opacity: isMuted ? 0.3 : 1 
                        }} 
                      />
                    ))}
                  </div>
                  <p className="font-semibold">You (Host)</p>
                  <p className="text-sm text-muted-foreground">
                    {isMuted ? "Muted" : "Speaking"}
                  </p>
                </div>
                
                <div className="flex flex-col items-center justify-center p-8 bg-muted rounded-lg">
                  <div className="audio-wave mb-4">
                    {[3, 7, 10, 15, 10, 7, 3].map((height, i) => (
                      <div 
                        key={i}
                        className="audio-wave-bar animate-wave" 
                        style={{ 
                          height: `${height * 3}px`,
                          animationDelay: `${i * 0.1}s`
                        }} 
                      />
                    ))}
                  </div>
                  <p className="font-semibold">Jane Smith</p>
                  <p className="text-sm text-muted-foreground">Speaking</p>
                </div>
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
                <p className="text-xs text-muted-foreground">Recording to your device</p>
                <div className="flex items-center mt-1">
                  <span className={`h-2 w-2 rounded-full ${isRecording ? 'bg-green-500' : 'bg-muted'}`}></span>
                  <span className="text-xs ml-2">{isRecording ? 'Active' : 'Ready'}</span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm font-medium">Cloud Recording</p>
                <p className="text-xs text-muted-foreground">Recording to cloud storage</p>
                <div className="flex items-center mt-1">
                  <span className={`h-2 w-2 rounded-full ${isRecording ? 'bg-green-500' : 'bg-muted'}`}></span>
                  <span className="text-xs ml-2">{isRecording ? 'Active' : 'Ready'}</span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm font-medium">Separate Tracks</p>
                <p className="text-xs text-muted-foreground">Each participant on separate audio track</p>
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
