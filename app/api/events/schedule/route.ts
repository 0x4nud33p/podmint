import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import getUserSession from "@/utils/getUserData";

export async function POST(req: NextRequest) {
  console.log("Received request to schedule event");

  const bodyText = await req.text();
  console.log("Request body:", bodyText);

  const { title, date, participants } = JSON.parse(bodyText);

  const session = await getUserSession();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!title || !date || !participants) {
    return new Response("Missing fields", { status: 400 });
  }

  const newEvent = {
    id: Date.now().toString(),
    title,
    date: new Date(date),
    participants,
  };

  const response = await prisma.recordingSession.create({
    data: {
      title: newEvent.title,
      scheduledAt: newEvent.date,
      hostId: session.user.id,
      participants: {
        create: participants.map((participant: string) => ({
          name: participant.trim(),
          isGuest: true 
        }))
      }
    },
  });

  if (!response) {
    return new Response("Failed to create event", { status: 500 });
  }

  return new Response(JSON.stringify(newEvent), { status: 201 });
}
