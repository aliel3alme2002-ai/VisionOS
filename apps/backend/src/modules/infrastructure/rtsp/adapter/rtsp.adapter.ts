import { Injectable } from '@nestjs/common';
import { StreamAdapter } from '../../../integration/contracts/stream.adapter';
import { ConnectionAdapter } from '../../../integration/contracts/connection.adapter';
import { HealthAdapter } from '../../../integration/contracts/health.adapter';
import { StreamSession } from '../../../integration/models/stream-session';
import { AdapterHealth } from '../../../integration/models/adapter-health';
import { RtspConnectionManager } from '../connection/rtsp-connection-manager';
import { RtspSessionManager } from '../session/rtsp-session-manager';
import { RtspHealthService } from '../health/rtsp-health.service';
import { RtspReconnectService } from '../reconnect/rtsp-reconnect.service';

@Injectable()
export class RtspAdapter implements StreamAdapter, ConnectionAdapter, HealthAdapter {
  constructor(
    private readonly connectionManager: RtspConnectionManager,
    private readonly sessionManager: RtspSessionManager,
    private readonly healthService: RtspHealthService,
    private readonly reconnectService: RtspReconnectService
  ) {}

  async connect(target: string): Promise<boolean> {
    return this.connectionManager.connect(target);
  }

  async disconnect(target: string): Promise<void> {
    await this.connectionManager.disconnect(target);
  }

  async reconnect(target: string): Promise<boolean> {
    if (!this.reconnectService.shouldRetry(1)) return false;
    return this.connectionManager.reconnect(target);
  }

  async openStream(cameraId: string, profile: string): Promise<StreamSession> {
    const sessionId = 'rtsp_sess_' + Date.now().toString();
    const url = 'rtsp://camera-stream/' + cameraId + '/' + profile;
    const rtspSession = this.sessionManager.createSession(sessionId, cameraId, url);

    return {
      sessionId: rtspSession.id,
      cameraId: rtspSession.cameraId,
      streamUrl: rtspSession.streamUrl,
      resolution: '1920x1080',
      fps: 30,
      startedAt: rtspSession.startedAt
    };
  }

  async closeStream(sessionId: string): Promise<void> {
    this.sessionManager.removeSession(sessionId);
  }

  async restartStream(sessionId: string): Promise<StreamSession> {
    const existing = this.sessionManager.getSession(sessionId);
    const cameraId = existing ? existing.cameraId : 'unknown';
    this.sessionManager.removeSession(sessionId);
    return this.openStream(cameraId, 'main');
  }

  async health(): Promise<AdapterHealth> {
    return this.healthService.checkHealth();
  }

  async ping(): Promise<boolean> {
    return this.healthService.ping();
  }
}
