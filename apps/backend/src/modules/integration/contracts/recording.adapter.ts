import { RecordingSession } from '../models/recording-session';

export interface RecordingAdapter {
  startRecording(cameraId: string): Promise<RecordingSession>;
  stopRecording(sessionId: string): Promise<void>;
  pauseRecording(sessionId: string): Promise<void>;
  resumeRecording(sessionId: string): Promise<void>;
}
