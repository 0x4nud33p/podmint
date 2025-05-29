"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CreateSessionButton from "@/components/dashboard/CreateSessionButton";
import RecentRecording from "@/components/dashboard/RecentRecording";
import UpcomingSession from "@/components/dashboard/UpcomingSession";
import { toast } from "@/hooks/use-toast";
import { Recording } from "@/types/types";

const page: React.FC = () => {
  const [upcomingSessions, setUpcomingSessions] = useState<Recording[]>([]);

  const getUpcomingSessions = async () => {
    try{
      const res = await fetch("/api/events/upcoming", {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch upcoming sessions");
      }
      
      const data = await res.json();
      console.log(data,"response from backend");
      setUpcomingSessions(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error fetching sessions",
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  };

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

  useEffect(() => {
    getUpcomingSessions();
  },[upcomingSessions])

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
          {upcomingSessions.length > 0 ? (
            upcomingSessions.map((session) => (
              <UpcomingSession
                key={session.id}
                title={session.title}
                date={new Date(session.createdAt).toLocaleDateString()}
                time={new Date(session.scheduledAt!).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                guests={session?.participants.length}
                onJoin={handleJoinSession}
                onEdit={handleEditSession}
              />
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-muted-foreground">
              No upcoming sessions scheduled.
            </div>
          )}
          <Link
            href="/schedule"
            className="flex flex-col items-center justify-center border-2 border-dashed border-muted rounded-lg p-6 h-full min-h-[200px] hover:border-primary/50 transition-colors"
          >
            <Calendar className="h-10 w-10 mb-2 text-muted-foreground" />
            <p className="font-medium">Schedule a session</p>
            <p className="text-sm text-muted-foreground mt-1">
              Plan your next recording
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
