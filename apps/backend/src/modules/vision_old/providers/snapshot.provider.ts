export interface SnapshotProvider {
  captureSnapshot(cameraId: string): Promise<string>;
}

export const SNAPSHOT_PROVIDER = Symbol('SNAPSHOT_PROVIDER');
