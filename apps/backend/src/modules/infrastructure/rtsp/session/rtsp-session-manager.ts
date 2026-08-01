import { Injectable } from '@nestjs/common';
import { RtspSession } from './rtsp-session';

@Injectable()
export class RtspSessionManager {
  private sessions: Map<string, RtspSession> = new Map();

  createSession(id: string, cameraId: string, streamUrl: string): RtspSession {
    const session: RtspSession = {
      id,
      cameraId,
      streamUrl,
      state: 'CONNECTED',
      startedAt: new Date(),
      lastFrameAt: new Date(),
      retryCount: 0,
      statistics: {
        fps: 30,
        bitrate: 4000,
        packetsReceived: 100,
        packetsLost: 0,
        latency: 15,
        uptime: 0
      }
    };
    this.sessions.set(id, session);
    return session;
  }

  getSession(id: string): RtspSession | undefined {
    return this.sessions.get(id);
  }

  removeSession(id: string): void {
    this.sessions.delete(id);
  }

  getAllSessions(): RtspSession[] {
    return Array.from(this.sessions.values());
  }
}
