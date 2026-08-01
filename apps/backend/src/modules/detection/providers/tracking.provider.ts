import { DetectionResult } from '../domain/detection-result';
import { TrackedObject } from '../domain/tracked-object';

export interface TrackingProvider {
  assignTracks(frameResult: DetectionResult): Promise<TrackedObject[]>;
}

export const TRACKING_PROVIDER = Symbol('TRACKING_PROVIDER');
