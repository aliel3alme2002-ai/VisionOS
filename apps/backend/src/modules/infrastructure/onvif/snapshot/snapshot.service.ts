import { Injectable } from '@nestjs/common';
import { SnapshotResult } from '../../../integration/models/snapshot-result';

@Injectable()
export class SnapshotService {
  async capture(cameraId: string): Promise<SnapshotResult> {
    return {
      cameraId,
      timestamp: new Date(),
      imageUrl: 'http://192.168.1.100/onvif/snapshot.jpg',
      sizeBytes: 102400,
      format: 'JPEG'
    };
  }
}
