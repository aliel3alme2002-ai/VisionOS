export interface VisionStatisticsProps {
  framesReceived: number;
  framesDecoded: number;
  framesProcessed: number;
  inferenceCount: number;
  detectionCount: number;
  trackingCount: number;
  droppedFrames: number;
  averagePipelineTimeMs: number;
  processingFps: number;
  detectionFps: number;
  trackingFps: number;
  timestamp: Date;
}

export class VisionStatistics implements VisionStatisticsProps {
  public readonly framesReceived: number;
  public readonly framesDecoded: number;
  public readonly framesProcessed: number;
  public readonly inferenceCount: number;
  public readonly detectionCount: number;
  public readonly trackingCount: number;
  public readonly droppedFrames: number;
  public readonly averagePipelineTimeMs: number;
  public readonly processingFps: number;
  public readonly detectionFps: number;
  public readonly trackingFps: number;
  public readonly timestamp: Date;

  constructor(props: VisionStatisticsProps) {
    this.framesReceived = props.framesReceived;
    this.framesDecoded = props.framesDecoded;
    this.framesProcessed = props.framesProcessed;
    this.inferenceCount = props.inferenceCount;
    this.detectionCount = props.detectionCount;
    this.trackingCount = props.trackingCount;
    this.droppedFrames = props.droppedFrames;
    this.averagePipelineTimeMs = props.averagePipelineTimeMs;
    this.processingFps = props.processingFps;
    this.detectionFps = props.detectionFps;
    this.trackingFps = props.trackingFps;
    this.timestamp = props.timestamp;
  }
}
