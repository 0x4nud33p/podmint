
import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Download, Pause, Play, SkipBack, SkipForward, Volume, Volume1, Volume2, VolumeX } from "lucide-react";
import AudioWaveform from "./AudioWaveform";

type PlaybackControlsProps = {
  title: string;
  duration: string;
  currentTime: string;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onSeek: (value: number[]) => void;
  onDownload: () => void;
  progress: number;
  volume: number;
  onVolumeChange: (value: number[]) => void;
};

const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  title,
  duration,
  currentTime,
  isPlaying,
  onPlay,
  onPause,
  onSeek,
  onDownload,
  progress,
  volume,
  onVolumeChange,
}) => {
  const VolumeIcon = volume === 0 
    ? VolumeX 
    : volume < 0.5 
      ? Volume1 
      : Volume2;

  return (
    <div className="w-full space-y-4 p-4 bg-card rounded-lg border shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-medium line-clamp-1">{title}</h3>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8" 
          onClick={onDownload}
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-2">
        <div className="relative h-12 flex items-center">
          <Slider
            value={[progress]}
            min={0}
            max={100}
            step={1}
            onValueChange={onSeek}
            className="my-4"
          />
          <AudioWaveform 
            className="absolute left-0 right-0 bottom-0 pb-1 pointer-events-none" 
            isPlaying={isPlaying}
          />
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{currentTime}</span>
          <span>{duration}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <VolumeIcon className="h-4 w-4 text-muted-foreground" />
          <Slider
            value={[volume * 100]}
            min={0}
            max={100}
            step={1}
            onValueChange={onVolumeChange}
            className="w-24"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            aria-label="Skip backward"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          
          <Button
            variant="default"
            size="icon"
            className="h-10 w-10 rounded-full"
            onClick={isPlaying ? onPause : onPlay}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            aria-label="Skip forward"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="w-24" />
      </div>
    </div>
  );
};

export default PlaybackControls;
