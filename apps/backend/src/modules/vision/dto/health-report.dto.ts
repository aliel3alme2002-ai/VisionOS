export class HealthReportResponseDto {
  latency!: number;
  packetLoss!: number;
  bitrate!: number;
  uptime!: number;
  streamStatus!: string;
  lastHeartbeat!: string;
}
