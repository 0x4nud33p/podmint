import prisma from "@/lib/db";
import getUserSession from "@/utils/getUserData";

export async function GET() {
    const session = await getUserSession();
    if (!session?.user) return new Response("Unauthorized", { status: 401 });
    try{
        const recordings = await prisma.recordingSession.findMany({
            where: {
              hostId: session.user.id,
              status: "completed",
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 10,
            include: {
              participants: true,
              tracks: true,
            },
          });
        return new Response(JSON.stringify(recordings), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch recordings", { status: 500 });
    }
}