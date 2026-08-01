import { DetectionFrame } from '../domain/detection-frame';

export interface StreamProvider {
  getFrame(streamProfileId: string): Promise<DetectionFrame>;
  startCapture(streamProfileId: string): Promise<boolean>;
  stopCapture(streamProfileId: string): Promise<boolean>;
}

export const STREAM_PROVIDER = Symbol('STREAM_PROVIDER');
