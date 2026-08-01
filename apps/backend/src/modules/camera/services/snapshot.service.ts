import { Injectable, Inject } from '@nestjs/common';
import { SnapshotProvider, SNAPSHOT_PROVIDER } from '../providers/snapshot.provider';

@Injectable()
export class SnapshotService {
  constructor(
    @Inject(SNAPSHOT_PROVIDER) private readonly snapshotProvider: SnapshotProvider
  ) {}

  async takeSnapshot(cameraId: string): Promise<string> {
    return this.snapshotProvider.takeSnapshot(cameraId);
  }
}
