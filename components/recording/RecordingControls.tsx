
import React from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Pause, Play, Share, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type RecordingControlsProps = {
  isRecording: boolean;
  isPaused: boolean;
  isMuted: boolean;
  recordingTime: string;
  onStartRecording: () => void;
  onPauseRecording: () => void;
  onStopRecording: () => void;
  onToggleMute: () => void;
  onInviteGuest: () => void;
  className?: string;
};

const RecordingControls: React.FC<RecordingControlsProps> = ({
  isRecording,
  isPaused,
  isMuted,
  recordingTime,
  onStartRecording,
  onPauseRecording,
  onStopRecording,
  onToggleMute,
  onInviteGuest,
  className,
}) => {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      {isRecording && (
        <div className="mb-4 flex items-center gap-2">
          <div className="recording-indicator" />
          <Badge variant="outline" className="text-sm font-medium">
            {recordingTime}
          </Badge>
        </div>
      )}

      <div className="flex items-center gap-2 sm:gap-4">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={onToggleMute}
        >
          {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>

        {isRecording ? (
          <>
            <Button
              variant={isPaused ? "default" : "outline"}
              size="icon"
              className="h-12 w-12 rounded-full"
              onClick={onPauseRecording}
            >
              {isPaused ? <Play className="h-6 w-6" /> : <Pause className="h-6 w-6" />}
            </Button>

            <Button
              variant="destructive"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={onStopRecording}
            >
              <span className="h-4 w-4 bg-destructive-foreground rounded-sm" />
            </Button>
          </>
        ) : (
          <Button
            variant="default"
            size="icon"
            className="h-12 w-12 rounded-full bg-red-500 hover:bg-red-600"
            onClick={onStartRecording}
          >
            <span className="h-4 w-4 bg-white rounded-full" />
          </Button>
        )}

        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={onInviteGuest}
        >
          <User className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default RecordingControls;
