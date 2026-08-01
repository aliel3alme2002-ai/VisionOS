import { Injectable } from '@nestjs/common';
import { FfmpegProcess } from './ffmpeg-process';
import { FfmpegConfig } from '../configuration/ffmpeg-config';
import { FfmpegSession } from '../models/ffmpeg-session';
import { FfmpegHealth } from '../monitoring/ffmpeg-health';

@Injectable()
export class FfmpegManager {
  private readonly activeProcesses: Map<string, FfmpegProcess> = new Map();
  private readonly sessions: Map<string, FfmpegSession> = new Map();

  constructor(private readonly health: FfmpegHealth) {}

  public startProcess(
    streamId: string,
    rtspUrl: string,
    config: FfmpegConfig,
    onChunk: (chunk: Uint8Array) => void,
  ): FfmpegSession {
    const process = new FfmpegProcess(streamId, rtspUrl, config);
    const pid = process.spawnProcess(onChunk, (err) => {
      this.handleProcessError(streamId, err);
    });

    const session = new FfmpegSession({
      sessionId: `ff-${streamId}-${Date.now()}`,
      streamId,
      rtspUrl,
      pid,
      state: 'RUNNING',
      startedAt: new Date(),
      reconnectCount: 0,
    });

    this.activeProcesses.set(streamId, process);
    this.sessions.set(streamId, session);
    this.health.updateStatistics(streamId, 'RUNNING', 30, 0, 0, 0);

    return session;
  }

  public stopProcess(streamId: string): boolean {
    const process = this.activeProcesses.get(streamId);
    if (!process) return false;

    process.kill();
    this.activeProcesses.delete(streamId);
    const session = this.sessions.get(streamId);
    if (session) session.state = 'STOPPED';

    this.health.updateStatistics(streamId, 'STOPPED', 0, 0, 0, 0);
    return true;
  }

  private handleProcessError(streamId: string, _err: Error): void {
    const session = this.sessions.get(streamId);
    if (session) {
      session.state = 'RESTARTING';
      session.reconnectCount++;
      this.health.updateStatistics(streamId, 'RESTARTING', 0, 0, 0, session.reconnectCount);
    }
  }

  public getSession(streamId: string): FfmpegSession | null {
    return this.sessions.get(streamId) ?? null;
  }
}
