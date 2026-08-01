export interface RuntimeStatisticsProps {
  gpuUsagePercent: number;
  cpuUsagePercent: number;
  ramUsageMb: number;
  vramUsageMb: number;
  fps: number;
  latencyMs: number;
  queueSize: number;
  activeSessions: number;
  timestamp: Date;
}

export class RuntimeStatistics implements RuntimeStatisticsProps {
  public readonly gpuUsagePercent: number;
  public readonly cpuUsagePercent: number;
  public readonly ramUsageMb: number;
  public readonly vramUsageMb: number;
  public readonly fps: number;
  public readonly latencyMs: number;
  public readonly queueSize: number;
  public readonly activeSessions: number;
  public readonly timestamp: Date;

  constructor(props: RuntimeStatisticsProps) {
    this.gpuUsagePercent = props.gpuUsagePercent;
    this.cpuUsagePercent = props.cpuUsagePercent;
    this.ramUsageMb = props.ramUsageMb;
    this.vramUsageMb = props.vramUsageMb;
    this.fps = props.fps;
    this.latencyMs = props.latencyMs;
    this.queueSize = props.queueSize;
    this.activeSessions = props.activeSessions;
    this.timestamp = props.timestamp;
  }
}
