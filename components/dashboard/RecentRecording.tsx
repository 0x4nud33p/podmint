
import React from "react";
import { Clock, Download, Play, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

type RecordingProps = {
  title: string;
  date: string;
  duration: string;
  thumbnailUrl?: string;
  onPlay: () => void;
  onDownload: () => void;
};

const RecentRecording: React.FC<RecordingProps> = ({
  title,
  date,
  duration,
  thumbnailUrl,
  onPlay,
  onDownload,
}) => {
  return (
    <Card className="podcast-card overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-32 bg-muted overflow-hidden">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-r from-primary-light to-primary-mint text-white">
              <div className="audio-wave">
                {[3, 5, 7, 4, 6, 8, 5, 3].map((height, i) => (
                  <div 
                    key={i}
                    className="audio-wave-bar"
                    style={{ height: `${height * 4}px` }} 
                  />
                ))}
              </div>
            </div>
          )}
          <Button
            size="icon"
            variant="secondary"
            className="absolute right-2 top-2 h-8 w-8"
            onClick={onPlay}
          >
            <Play className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-medium line-clamp-1">{title}</h3>
        <div className="flex items-center justify-between mt-1 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            <span>{duration}</span>
          </div>
          <span>{date}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto"
          onClick={onDownload}
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentRecording;
