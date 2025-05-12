
import React from "react";
import { Calendar, Clock, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

type SessionProps = {
  title: string;
  date: string;
  time: string;
  guests: number;
  onJoin: () => void;
  onEdit: () => void;
};

const UpcomingSession: React.FC<SessionProps> = ({
  title,
  date,
  time,
  guests,
  onJoin,
  onEdit,
}) => {
  return (
    <Card className="podcast-card">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
      </CardHeader>
      <CardContent className="pb-4 space-y-3">
        <div className="flex items-center text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm">{date}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Clock className="h-4 w-4 mr-2" />
          <span className="text-sm">{time}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Users className="h-4 w-4 mr-2" />
          <span className="text-sm">{guests} guests</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button className="flex-1" variant="outline" onClick={onEdit}>
          Edit
        </Button>
        <Button className="flex-1" onClick={onJoin}>
          Join
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpcomingSession;
