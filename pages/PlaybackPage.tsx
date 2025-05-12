
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Share } from "lucide-react";
import { Link } from "react-router-dom";
import PlaybackControls from "@/components/playback/PlaybackControls";
import { toast } from "@/hooks/use-toast";

const PlaybackPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [volume, setVolume] = React.useState(0.8);
  const [currentTime, setCurrentTime] = React.useState("00:00");
  
  // Simulate playback progress when playing
  React.useEffect(() => {
    let interval: number;
    
    if (isPlaying) {
      interval = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
        
        // Update time display
        const totalDuration = 60 * 48 + 22; // 48:22 in seconds
        const currentSeconds = Math.floor((progress / 100) * totalDuration);
        const mins = Math.floor(currentSeconds / 60);
        const secs = currentSeconds % 60;
        setCurrentTime(`${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`);
      }, 500);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, progress]);
  
  const handlePlay = () => {
    setIsPlaying(true);
  };
  
  const handlePause = () => {
    setIsPlaying(false);
  };
  
  const handleSeek = (value: number[]) => {
    setProgress(value[0]);
    
    // Update time display based on seek position
    const totalDuration = 60 * 48 + 22; // 48:22 in seconds
    const currentSeconds = Math.floor((value[0] / 100) * totalDuration);
    const mins = Math.floor(currentSeconds / 60);
    const secs = currentSeconds % 60;
    setCurrentTime(`${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`);
  };
  
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0] / 100);
  };
  
  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your recording will be downloaded shortly",
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Share options",
      description: "Sharing options dialog would appear here",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link to="/library">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Interview with John Doe</h1>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleShare}>
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-muted rounded-xl aspect-video flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-light/20 to-primary-mint/20"></div>
            <div className="text-center z-10">
              <div className="mb-4 flex justify-center">
                <div className="audio-wave">
                  {Array.from({ length: 20 }).map((_, i) => {
                    const randomHeight = isPlaying ? Math.floor(Math.random() * 20) + 3 : 3;
                    return (
                      <div
                        key={i}
                        className="audio-wave-bar transition-all duration-300"
                        style={{ 
                          height: `${randomHeight}px`,
                          animationDelay: `${i * 0.05}s`,
                          animationPlayState: isPlaying ? 'running' : 'paused'
                        }}
                      />
                    );
                  })}
                </div>
              </div>
              <h3 className="text-lg font-medium">Audio Recording</h3>
              <p className="text-sm text-muted-foreground">May 10, 2025</p>
            </div>
          </div>
        </div>
        
        <div>
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="info" className="flex-1">Info</TabsTrigger>
              <TabsTrigger value="transcript" className="flex-1">Transcript</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="mt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Recording Details</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                    <div className="text-sm text-muted-foreground">Date</div>
                    <div className="text-sm">May 10, 2025</div>
                    
                    <div className="text-sm text-muted-foreground">Duration</div>
                    <div className="text-sm">48:22</div>
                    
                    <div className="text-sm text-muted-foreground">File Size</div>
                    <div className="text-sm">128.5 MB</div>
                    
                    <div className="text-sm text-muted-foreground">Format</div>
                    <div className="text-sm">MP3 / 320kbps</div>
                    
                    <div className="text-sm text-muted-foreground">Participants</div>
                    <div className="text-sm">You, John Doe</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium">Available Files</h3>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <span className="text-sm">Combined Mix</span>
                      <Button variant="ghost" size="sm" onClick={handleDownload}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <span className="text-sm">Your Audio Track</span>
                      <Button variant="ghost" size="sm" onClick={handleDownload}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <span className="text-sm">John's Audio Track</span>
                      <Button variant="ghost" size="sm" onClick={handleDownload}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="transcript" className="mt-4">
              <div className="h-80 overflow-y-auto border rounded-md p-4">
                <p className="text-sm text-muted-foreground italic">Transcript not available for this demo.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <PlaybackControls
        title="Interview with John Doe"
        duration="48:22"
        currentTime={currentTime}
        isPlaying={isPlaying}
        onPlay={handlePlay}
        onPause={handlePause}
        onSeek={handleSeek}
        onDownload={handleDownload}
        progress={progress}
        volume={volume}
        onVolumeChange={handleVolumeChange}
      />
    </div>
  );
};

export default PlaybackPage;
