"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight, Clock, Plus } from "lucide-react";
import Link from "next/link";
import CreateSessionButton from "@/components/dashboard/CreateSessionButton";
import RecentRecording from "@/components/dashboard/RecentRecording";
import UpcomingSession from "@/components/dashboard/UpcomingSession";
import { toast } from "@/hooks/use-toast";

const page: React.FC = () => {
  const handlePlayRecording = () => {
    toast({
      title: "Opening playback...",
    });
  };

  const handleDownloadRecording = () => {
    toast({
      title: "Download started",
      description: "Your recording will be downloaded shortly",
    });
  };

  const handleJoinSession = () => {
    toast({
      title: "Joining session...",
    });
  };

  const handleEditSession = () => {
    toast({
      title: "Edit session",
      description: "You can now modify your scheduled session",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your recordings and upcoming sessions
          </p>
        </div>
        <CreateSessionButton />
      </div>

      {/* Recent Recordings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Recordings</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/library" className="gap-1 items-center flex">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <RecentRecording
            title="Interview with John Doe"
            date="May 10, 2025"
            duration="48:22"
            onPlay={handlePlayRecording}
            onDownload={handleDownloadRecording}
          />

          <RecentRecording
            title="Weekly Podcast - Episode 42"
            date="May 8, 2025"
            duration="1:12:05"
            onPlay={handlePlayRecording}
            onDownload={handleDownloadRecording}
          />

          <RecentRecording
            title="Project Update Meeting"
            date="May 5, 2025"
            duration="32:15"
            onPlay={handlePlayRecording}
            onDownload={handleDownloadRecording}
          />
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/schedule" className="gap-1 items-center flex">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <UpcomingSession
            title="Interview with Jane Smith"
            date="May 15, 2025"
            time="2:00 PM - 3:00 PM"
            guests={2}
            onJoin={handleJoinSession}
            onEdit={handleEditSession}
          />

          <UpcomingSession
            title="Weekly Team Meeting"
            date="May 17, 2025"
            time="10:00 AM - 11:00 AM"
            guests={5}
            onJoin={handleJoinSession}
            onEdit={handleEditSession}
          />
          
          <Link href="/schedule" className="flex flex-col items-center justify-center border-2 border-dashed border-muted rounded-lg p-6 h-full min-h-[200px] hover:border-primary/50 transition-colors">
            <Calendar className="h-10 w-10 mb-2 text-muted-foreground" />
            <p className="font-medium">Schedule a session</p>
            <p className="text-sm text-muted-foreground mt-1">Plan your next recording</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
