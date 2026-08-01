import { DetectionResult } from '../../runtime-execution/result/models/detection-result';
import { TrackedObject } from '../../tracking/models/tracked-object';
import { VisionStatistics } from '../monitoring/vision-statistics';

export interface VisionResultProps {
  cameraId: string;
  frameId: string;
  timestamp: number;
  processingTimeMs: number;
  latencyMs: number;
  fps: number;
  detections: DetectionResult[];
  trackedObjects: TrackedObject[];
  statistics: VisionStatistics;
}

export class VisionResult implements VisionResultProps {
  public readonly cameraId: string;
  public readonly frameId: string;
  public readonly timestamp: number;
  public readonly processingTimeMs: number;
  public readonly latencyMs: number;
  public readonly fps: number;
  public readonly detections: DetectionResult[];
  public readonly trackedObjects: TrackedObject[];
  public readonly statistics: VisionStatistics;

  constructor(props: VisionResultProps) {
    this.cameraId = props.cameraId;
    this.frameId = props.frameId;
    this.timestamp = props.timestamp;
    this.processingTimeMs = props.processingTimeMs;
    this.latencyMs = props.latencyMs;
    this.fps = props.fps;
    this.detections = props.detections;
    this.trackedObjects = props.trackedObjects;
    this.statistics = props.statistics;
  }
}
