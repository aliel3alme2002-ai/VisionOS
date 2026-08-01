export interface RecordingStorageProvider {
  startRecording(cameraId: string, metadata: Record<string, unknown>): Promise<string>;
  stopRecording(storageId: string): Promise<string>;
  deleteRecording(storageLocation: string): Promise<boolean>;
  archiveRecording(storageLocation: string): Promise<string>;
}

export const RECORDING_STORAGE_PROVIDER = Symbol('RECORDING_STORAGE_PROVIDER');
