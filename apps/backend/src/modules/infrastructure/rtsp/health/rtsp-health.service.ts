import { Injectable } from '@nestjs/common';
import { AdapterHealth } from '../../../integration/models/adapter-health';
import { RtspSessionManager } from '../session/rtsp-session-manager';

@Injectable()
export class RtspHealthService {
  constructor(private readonly sessionManager: RtspSessionManager) {}

  async checkHealth(): Promise<AdapterHealth> {
    const sessions = this.sessionManager.getAllSessions();
    const hasFailures = sessions.some(s => s.state === 'FAILED' || s.state === 'DISCONNECTED');

    return {
      adapterId: 'rtsp-adapter-01',
      status: hasFailures ? 'DEGRADED' : 'UP',
      latencyMs: 12,
      lastCheckedAt: new Date(),
      details: {
        totalSessions: sessions.length
      }
    };
  }

  async ping(): Promise<boolean> {
    return true;
  }
}
