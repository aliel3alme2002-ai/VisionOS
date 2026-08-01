export interface FrigateHealth {
  status: 'RUNNING' | 'DEGRADED' | 'UNREACHABLE';
  uptimeSeconds: number;
  detectorFps: number;
}
