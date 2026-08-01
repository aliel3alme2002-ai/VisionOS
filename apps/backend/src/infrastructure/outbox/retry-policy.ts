import { Injectable } from '@nestjs/common';

@Injectable()
export class RetryPolicy {
  public readonly MAX_RETRIES = 5;

  public shouldRetry(retryCount: number): boolean {
    return retryCount < this.MAX_RETRIES;
  }

  public calculateBackoff(retryCount: number): number {
    // Exponential backoff: 2^retryCount * 1000ms
    // retryCount 0 -> 1000ms
    // retryCount 1 -> 2000ms
    // retryCount 2 -> 4000ms
    return Math.pow(2, retryCount) * 1000;
  }

  public isDeadLetterReady(retryCount: number): boolean {
    return retryCount >= this.MAX_RETRIES;
  }
}
