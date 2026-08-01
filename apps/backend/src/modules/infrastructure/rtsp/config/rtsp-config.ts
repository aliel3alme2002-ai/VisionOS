export interface RtspConfig {
  maxRetries: number;
  retryDelayMs: number;
  exponentialBackoff: boolean;
  connectionTimeoutMs: number;
  keepAliveIntervalMs: number;
}
