"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface ScheduledEvent {
  id: string;
  title: string;
  date: Date;
  participants: string[];
}

export default function ScheduleComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<ScheduledEvent[]>([
    {
      id: "1",
      title: "Team Meeting",
      date: new Date(),
      participants: ["You (Host)", "Jane Smith"],
    },
  ]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: new Date(),
    participants: "",
  });

  const handleAddEvent = () => {
    setEvents([
      ...events,
      {
        id: (events.length + 1).toString(),
        title: newEvent.title,
        date: newEvent.date,
        participants: newEvent.participants.split(","),
      },
    ]);
    setNewEvent({ title: "", date: new Date(), participants: "" });
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">Schedule</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Add Event</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="datetime-local"
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      date: new Date(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="participants">
                  Participants (comma separated)
                </Label>
                <Input
                  id="participants"
                  value={newEvent.participants}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, participants: e.target.value })
                  }
                  className="w-full"
                />
              </div>
              <Button onClick={handleAddEvent} className="w-full sm:w-auto">
                Schedule Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select a date to view events</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              classNames={{
                day: "h-9 w-9 text-sm",
                head_cell: "text-muted-foreground text-sm font-normal",
              }}
            />
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Events</CardTitle>
              <CardDescription>
                Events on {date?.toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {events
                .filter(
                  (event) =>
                    event.date.toLocaleDateString() ===
                    date?.toLocaleDateString()
                )
                .map((event) => (
                  <Card key={event.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1">
                          <h3 className="font-medium text-base md:text-lg">
                            {event.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {event.date.toLocaleDateString()}{" "}
                            <span className="hidden sm:inline">
                              {event.date.toLocaleTimeString()}
                            </span>
                            <span className="sm:hidden">
                              {event.date.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {event.participants.map((participant) => (
                              <span
                                key={participant}
                                className="px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs sm:text-sm"
                              >
                                {participant}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="self-end">
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              {events.filter(
                (event) =>
                  event.date.toLocaleDateString() === date?.toLocaleDateString()
              ).length === 0 && (
                <p className="text-muted-foreground text-center py-4 md:py-6">
                  No events scheduled for this day
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
