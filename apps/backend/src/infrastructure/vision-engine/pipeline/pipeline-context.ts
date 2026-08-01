import { Frame } from '../../video/frame/frame';
import { DetectionResult } from '../../runtime-execution/result/models/detection-result';
import { TrackedObject } from '../../tracking/models/tracked-object';

export class PipelineContext {
  public rawFrame?: Frame | undefined;
  public preprocessedTensor?: Float32Array | undefined;
  public detections: DetectionResult[] = [];
  public trackedObjects: TrackedObject[] = [];
  public startTimeMs = 0;
  public endTimeMs = 0;

  constructor(public readonly frameId: string, public readonly cameraId: string) {
    this.startTimeMs = Date.now();
  }

  public getElapsedTimeMs(): number {
    return (this.endTimeMs > 0 ? this.endTimeMs : Date.now()) - this.startTimeMs;
  }
}
