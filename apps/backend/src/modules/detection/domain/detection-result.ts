import { BoundingBox } from './bounding-box';
import { TrackedObject } from './tracked-object';

export interface DetectionResult {
  jobId: string;
  frameId: string;
  timestamp: Date;
  boxes: BoundingBox[];
  trackedObjects: TrackedObject[];
}
