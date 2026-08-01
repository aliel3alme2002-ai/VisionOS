import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis.service';
import { RateLimiterService as IRateLimiterService } from '../interfaces/rate-limiter.interface';

@Injectable()
export class RateLimiterService implements IRateLimiterService {
  private readonly PREFIX = 'ratelimit:';

  constructor(private readonly redisService: RedisService) {}

  async consume(key: string, limit: number, windowSeconds: number): Promise<boolean> {
    const rateKey = this.getKey(key);
    const client = this.redisService.getClient();

    const script = `
      local current
      current = redis.call("incr", KEYS[1])
      if current == 1 then
        redis.call("expire", KEYS[1], ARGV[1])
      end
      if current > tonumber(ARGV[2]) then
        return 0
      else
        return 1
      end
    `;

    const result = await client.eval(script, 1, rateKey, windowSeconds.toString(), limit.toString());
    return result === 1;
  }

  async reset(key: string): Promise<void> {
    const rateKey = this.getKey(key);
    await this.redisService.getClient().del(rateKey);
  }

  async remaining(key: string, limit: number): Promise<number> {
    const rateKey = this.getKey(key);
    const current = await this.redisService.getClient().get(rateKey);
    if (!current) return limit;
    
    const count = parseInt(current, 10);
    return Math.max(0, limit - count);
  }

  private getKey(key: string): string {
    return `${this.PREFIX}${key}`;
  }
}
