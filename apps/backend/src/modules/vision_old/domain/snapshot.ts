import { SnapshotStatus } from '../enums/snapshot-status';

export interface Snapshot {
  id: string;
  cameraId: string;
  timestamp: Date;
  path: string;
  sizeBytes: number;
  status: SnapshotStatus;
}
