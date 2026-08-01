import { Injectable } from '@nestjs/common';
import { VideoSession } from './video-session';
import { VideoTimeline } from '../timeline/timeline';
import { VideoReader } from '../reader/video-reader';

@Injectable()
export class VideoPlayer {
  private readonly sessions: Map<string, VideoSession> = new Map();

  constructor(
    private readonly timeline: VideoTimeline,
    private readonly reader: VideoReader,
  ) {}

  public createSession(sourcePath: string, loop = false, targetFps = 30): VideoSession {
    const demuxInfo = this.reader.openFile(sourcePath);
    const durationMs = demuxInfo?.durationMs ?? 60000;
    const totalFrames = demuxInfo?.totalFrames ?? 1800;

    this.timeline.initialize(durationMs, totalFrames);

    const sessionId = `session-${Date.now()}`;
    const session = new VideoSession({
      sessionId,
      sourcePath,
      state: 'PAUSED',
      currentPtsMs: 0,
      playbackSpeed: 1.0,
      loop,
      targetFps,
    });

    this.sessions.set(sessionId, session);
    return session;
  }

  public play(sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;
    session.state = 'PLAYING';
    return true;
  }

  public pause(sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;
    session.state = 'PAUSED';
    return true;
  }

  public seek(sessionId: string, targetPtsMs: number): number {
    const session = this.sessions.get(sessionId);
    if (!session) return 0;
    session.state = 'SEEKING';
    session.currentPtsMs = this.timeline.seek(targetPtsMs);
    session.state = 'PAUSED';
    return session.currentPtsMs;
  }

  public stop(sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;
    session.state = 'STOPPED';
    session.currentPtsMs = 0;
    return true;
  }

  public getSession(sessionId: string): VideoSession | null {
    return this.sessions.get(sessionId) ?? null;
  }
}
