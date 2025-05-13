
import React from "react";
import { Mic, MicOff, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ParticipantTileProps = {
  name: string;
  avatarUrl?: string;
  isSpeaking: boolean;
  isMuted: boolean;
  isHost?: boolean;
  className?: string;
};

const ParticipantTile: React.FC<ParticipantTileProps> = ({
  name,
  avatarUrl,
  isSpeaking,
  isMuted,
  isHost,
  className,
}) => {
  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div 
      className={cn(
        "relative rounded-lg overflow-hidden transition-all",
        isSpeaking ? "ring-2 ring-primary" : "ring-1 ring-border",
        className
      )}
    >
      <div className="aspect-video bg-muted flex flex-col items-center justify-center">
        <Avatar className="h-20 w-20">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        <span className="mt-2 font-medium">{name}</span>
      </div>
      
      <div className="absolute bottom-2 right-2">
        {isMuted ? (
          <div className="bg-red-500 text-white p-1 rounded-full">
            <MicOff className="h-4 w-4" />
          </div>
        ) : (
          <div className="bg-primary text-white p-1 rounded-full">
            <Mic className="h-4 w-4" />
          </div>
        )}
      </div>
      
      {isHost && (
        <div className="absolute top-2 left-2">
          <div className="bg-secondary px-2 py-1 rounded-full text-xs font-medium">
            Host
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantTile;
