export interface FfmpegStatisticsProps {
  streamId: string;
  fps: number;
  bitrateKbps: number;
  decodedFrames: number;
  droppedFrames: number;
  reconnectCount: number;
  cpuUsagePercent: number;
  memoryUsageMb: number;
  timestamp: Date;
}

export class FfmpegStatistics implements FfmpegStatisticsProps {
  public readonly streamId: string;
  public readonly fps: number;
  public readonly bitrateKbps: number;
  public readonly decodedFrames: number;
  public readonly droppedFrames: number;
  public readonly reconnectCount: number;
  public readonly cpuUsagePercent: number;
  public readonly memoryUsageMb: number;
  public readonly timestamp: Date;

  constructor(props: FfmpegStatisticsProps) {
    this.streamId = props.streamId;
    this.fps = props.fps;
    this.bitrateKbps = props.bitrateKbps;
    this.decodedFrames = props.decodedFrames;
    this.droppedFrames = props.droppedFrames;
    this.reconnectCount = props.reconnectCount;
    this.cpuUsagePercent = props.cpuUsagePercent;
    this.memoryUsageMb = props.memoryUsageMb;
    this.timestamp = props.timestamp;
  }
}
