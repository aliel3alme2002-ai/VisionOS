export interface SnapshotProvider {
  takeSnapshot(cameraId: string): Promise<string>;
}

export const SNAPSHOT_PROVIDER = Symbol('SNAPSHOT_PROVIDER');
