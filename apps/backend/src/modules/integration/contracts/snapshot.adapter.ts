import { SnapshotResult } from '../models/snapshot-result';

export interface SnapshotAdapter {
  captureSnapshot(cameraId: string): Promise<SnapshotResult>;
}
