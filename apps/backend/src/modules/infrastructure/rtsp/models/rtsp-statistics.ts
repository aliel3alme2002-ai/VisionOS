export interface RtspStatistics {
  fps: number;
  bitrate: number;
  packetsReceived: number;
  packetsLost: number;
  latency: number;
  uptime: number;
}
