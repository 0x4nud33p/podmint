import getUserSession from "@/utils/getUserData";
import { NextRequest } from "next/server";
import prisma from "@/lib/db";


export async function GET(req: NextRequest){
    const session = await getUserSession();
    if (!session?.user) return new Response("Unauthorized", { status: 401 });
    try {
        const upcomingEvents = await prisma.recordingSession.findMany({
            where: {
                hostId: session.user.id,
                scheduledAt: {
                    gte: new Date(),
                },
            },
            orderBy: {
                scheduledAt: "asc",
            },
            include: {
                participants: true,
            },
        });
        return new Response(JSON.stringify(upcomingEvents), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch upcoming events", { status: 500 });
    }
}