export interface CameraDiscovery {
  ipAddress: string;
  macAddress: string;
  manufacturer?: string;
  model?: string;
  firmwareVersion?: string;
  discoveredAt: Date;
}
