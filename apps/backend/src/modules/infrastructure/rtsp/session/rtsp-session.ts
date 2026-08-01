import { RtspConnectionState } from '../models/rtsp-state';
import { RtspStatistics } from '../models/rtsp-statistics';

export interface RtspSession {
  id: string;
  cameraId: string;
  streamUrl: string;
  state: RtspConnectionState;
  startedAt: Date;
  lastFrameAt?: Date;
  retryCount: number;
  statistics: RtspStatistics;
}
