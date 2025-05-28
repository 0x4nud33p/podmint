import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import getUserSession from "@/utils/getUserData";

export async function GET(req: NextRequest) {
  const session = await getUserSession();
  if (!session?.user) return new Response("Unauthorized", { status: 401 });

  try {
    const events = await prisma.recordingSession.findMany({
      where: {
        hostId: session.user.id,
      },
      include: {
        participants: true,
      },
      orderBy: {
        scheduledAt: "asc",
      },
    });

    return new Response(JSON.stringify(events), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch scheduled events", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getUserSession();
  if (!session?.user) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();
  const { title, scheduledAt, participants } = body;

  if (!title || !scheduledAt || !participants) {
    return new Response("Missing fields", { status: 400 });
  }

  try {
    const response = await prisma.recordingSession.create({
      data: {
        title,
        scheduledAt: new Date(scheduledAt),
        hostId: session.user.id,
        participants: {
          create: participants.map((p: { name: string }) => ({
            name: p.name,
            isGuest: true,
          })),
        },
      },
      include: {
        participants: true,
      },
    });

    return new Response(JSON.stringify(response), { status: 201 });
  } catch (error) {
    return new Response("Failed to create event", { status: 500 });
  }
}
