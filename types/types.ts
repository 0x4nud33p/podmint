

export interface Participant {
  id: string;
  name: string;
  stream: MediaStream;
  isHost?: boolean;
  isMuted: boolean;
}

export interface User {
    id: string;
    name?: string;
    email?: string;
  }  

export interface Recording {
    id: string;
    title: string;
    description?: string;
    createdAt: Date;
    scheduledAt?: Date;
    status: string;
    hostId: string;
    host: User;
    participants: Participant[];
    tracks?: MediaTrack[];
  }

export interface MediaTrack {
    id: string;
    type: 'audio' | 'video' | 'screenshare';
    url: string;
    duration: number; 
    recordedAt: Date;
    participantId: string;
    sessionId: string;
    participant?: Participant; 
    session?: Recording; 
  }  