import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import getUserSession from "@/utils/getUserData";

export async function POST(req: NextRequest) {
    console.log("Received request to schedule event");
    console.log("Request body:", await req.text());
  const { title, date, participants } = await req.json();
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
        connect: participants.map((participant: string) => ({
          name: participant.trim(),
          sessionId: session.user.id,
          session: {
            connect: { id: session.user.id },
          }
        })),
      }
    },
  });
    if (!response) {
        return new Response("Failed to create event", { status: 500 });
    }
  return new Response(JSON.stringify(newEvent), { status: 201 });
}