
import React from "react";
import { cn } from "@/lib/utils";

type AudioWaveformProps = {
  className?: string;
  isPlaying?: boolean;
};

const AudioWaveform: React.FC<AudioWaveformProps> = ({ 
  className,
  isPlaying = false 
}) => {
  return (
    <div className={cn("audio-wave justify-center", className)}>
      {Array.from({ length: 8 }).map((_, i) => {
        const randomHeight = Math.floor(Math.random() * 16) + 5;
        return (
          <div
            key={i}
            className={cn(
              "audio-wave-bar transition-all duration-300",
              isPlaying && "animate-wave"
            )}
            style={{ 
              height: `${isPlaying ? randomHeight : 4}px`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        );
      })}
    </div>
  );
};

export default AudioWaveform;
