import { Injectable } from '@nestjs/common';
import { ByteTrack } from '../../tracking/tracker/byte-track';
import { DetectionResult } from '../../runtime-execution/result/models/detection-result';
import { TrackedObject } from '../../tracking/models/tracked-object';

@Injectable()
export class TrackingExecutor {
  constructor(private readonly byteTrack: ByteTrack) {}

  public executeTracking(
    detections: DetectionResult[],
    frameId: string,
    timestamp: number,
  ): TrackedObject[] {
    const result = this.byteTrack.track(detections, frameId, timestamp, {
      highThreshold: 0.5,
      lowThreshold: 0.1,
      matchThreshold: 0.45,
      maxMisses: 30,
    });

    return result.trackedObjects;
  }
}
