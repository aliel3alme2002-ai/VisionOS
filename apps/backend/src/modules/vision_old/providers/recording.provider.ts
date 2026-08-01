export interface RecordingProvider {
  startRecording(cameraId: string): Promise<string>;
  stopRecording(recordingId: string): Promise<boolean>;
  getRecording(recordingId: string): Promise<any>;
}

export const RECORDING_PROVIDER = Symbol('RECORDING_PROVIDER');
