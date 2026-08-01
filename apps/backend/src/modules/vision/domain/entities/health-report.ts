export interface HealthReportProps {
  latency?: number;
  packetLoss?: number;
  bitrate?: number;
  uptime?: number;
  streamStatus?: string;
  lastHeartbeat?: Date;
}

export class HealthReport {
  public readonly latency: number;
  public readonly packetLoss: number;
  public readonly bitrate: number;
  public readonly uptime: number;
  public readonly streamStatus: string;
  public readonly lastHeartbeat: Date;

  constructor(props?: HealthReportProps) {
    this.latency = props?.latency ?? 0;
    this.packetLoss = props?.packetLoss ?? 0;
    this.bitrate = props?.bitrate ?? 0;
    this.uptime = props?.uptime ?? 0;
    this.streamStatus = props?.streamStatus ?? 'HEALTHY';
    this.lastHeartbeat = props?.lastHeartbeat ?? new Date();
  }
}
