export interface AdapterHealth {
  adapterId: string;
  status: 'UP' | 'DOWN' | 'DEGRADED';
  latencyMs: number;
  lastCheckedAt: Date;
  details?: Record<string, unknown>;
}
