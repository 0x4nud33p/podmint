-- CreateTable
CREATE TABLE "recording_session" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scheduledAt" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "hostId" TEXT NOT NULL,

    CONSTRAINT "recording_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isGuest" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_track" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "participantId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "media_track_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "recording_session" ADD CONSTRAINT "recording_session_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participant" ADD CONSTRAINT "participant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participant" ADD CONSTRAINT "participant_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "recording_session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_track" ADD CONSTRAINT "media_track_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_track" ADD CONSTRAINT "media_track_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "recording_session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
