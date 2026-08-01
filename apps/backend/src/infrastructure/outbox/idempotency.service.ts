import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class IdempotencyService {
  private readonly PREFIX = 'idempotency:';
  private readonly TTL_SECONDS = 60 * 60 * 24; // 24 hours

  constructor(private readonly redisService: RedisService) {}

  /**
   * Attempts to mark a key as processed.
   * Returns true if it was successfully marked (meaning it wasn't processed before).
   * Returns false if it has already been processed.
   */
  public async tryMarkProcessed(key: string): Promise<boolean> {
    const fullKey = this.getKey(key);
    const result = await this.redisService.getClient().set(
      fullKey,
      'PROCESSED',
      'EX',
      this.TTL_SECONDS,
      'NX'
    );
    return result === 'OK';
  }

  public async hasBeenProcessed(key: string): Promise<boolean> {
    const fullKey = this.getKey(key);
    const result = await this.redisService.getClient().get(fullKey);
    return result === 'PROCESSED';
  }

  private getKey(key: string): string {
    return `${this.PREFIX}${key}`;
  }
}
