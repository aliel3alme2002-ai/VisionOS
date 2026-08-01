import { Injectable } from '@nestjs/common';
import { RtspConfig } from '../config/rtsp-config';

@Injectable()
export class RtspReconnectService {
  private readonly defaultConfig: RtspConfig = {
    maxRetries: 5,
    retryDelayMs: 2000,
    exponentialBackoff: true,
    connectionTimeoutMs: 10000,
    keepAliveIntervalMs: 5000
  };

  calculateNextDelay(retryCount: number): number {
    if (!this.defaultConfig.exponentialBackoff) {
      return this.defaultConfig.retryDelayMs;
    }
    return this.defaultConfig.retryDelayMs * Math.pow(2, retryCount);
  }

  shouldRetry(retryCount: number): boolean {
    return retryCount < this.defaultConfig.maxRetries;
  }
}
