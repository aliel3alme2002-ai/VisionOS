import { TimeoutError, NetworkError } from './errors';

export interface RetryOptions {
  readonly maxRetries: number;
  readonly baseDelayMs: number;
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = { maxRetries: 3, baseDelayMs: 1000 }
): Promise<T> {
  let attempt = 0;
  
  while (true) {
    try {
      return await operation();
    } catch (error) {
      attempt++;
      if (attempt > options.maxRetries) {
        throw error;
      }
      
      const shouldRetry = error instanceof NetworkError || error instanceof TimeoutError;
      if (!shouldRetry) {
        throw error;
      }
      
      const delay = options.baseDelayMs * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
