import { StreamSession } from '../models/stream-session';

export interface StreamAdapter {
  openStream(cameraId: string, profile: string): Promise<StreamSession>;
  closeStream(sessionId: string): Promise<void>;
  restartStream(sessionId: string): Promise<StreamSession>;
}
