import { RecordingStatus } from '../enums/recording-status';

export interface Recording {
  id: string;
  cameraId: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  path: string;
  sizeBytes: number;
  status: RecordingStatus;
}
