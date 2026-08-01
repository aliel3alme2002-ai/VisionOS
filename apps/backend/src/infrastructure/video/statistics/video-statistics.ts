export interface VideoStatisticsProps {
  fps: number;
  decodedFrames: number;
  droppedFrames: number;
  queueDepth: number;
  latency: number; // in ms
  processingTime: number; // in ms
  timestamp: Date;
}

export class VideoStatistics implements VideoStatisticsProps {
  public readonly fps: number;
  public readonly decodedFrames: number;
  public readonly droppedFrames: number;
  public readonly queueDepth: number;
  public readonly latency: number;
  public readonly processingTime: number;
  public readonly timestamp: Date;

  constructor(props: VideoStatisticsProps) {
    this.fps = props.fps;
    this.decodedFrames = props.decodedFrames;
    this.droppedFrames = props.droppedFrames;
    this.queueDepth = props.queueDepth;
    this.latency = props.latency;
    this.processingTime = props.processingTime;
    this.timestamp = props.timestamp;
  }
}
