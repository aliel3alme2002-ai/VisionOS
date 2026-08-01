import { Injectable, Inject } from '@nestjs/common';
import { TrackingProvider, TRACKING_PROVIDER } from '../providers/tracking.provider';
import { DetectionResult } from '../domain/detection-result';
import { TrackedObject } from '../domain/tracked-object';

@Injectable()
export class TrackingService {
  constructor(
    @Inject(TRACKING_PROVIDER) private readonly trackingProvider: TrackingProvider
  ) {}

  async applyTracking(result: DetectionResult): Promise<TrackedObject[]> {
    return this.trackingProvider.assignTracks(result);
  }
}
