export interface RateLimiterService {
  consume(key: string, limit: number, windowSeconds: number): Promise<boolean>;
  reset(key: string): Promise<void>;
  remaining(key: string, limit: number): Promise<number>;
}
