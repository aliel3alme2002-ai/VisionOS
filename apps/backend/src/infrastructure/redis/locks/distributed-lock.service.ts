import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis.service';
import { DistributedLockService as IDistributedLockService } from '../interfaces/distributed-lock.interface';

@Injectable()
export class DistributedLockService implements IDistributedLockService {
  private readonly PREFIX = 'lock:';

  constructor(private readonly redisService: RedisService) {}

  async acquire(key: string, owner: string, ttlSeconds: number): Promise<boolean> {
    const lockKey = this.getKey(key);
    const result = await this.redisService.getClient().set(
      lockKey,
      owner,
      'EX',
      ttlSeconds,
      'NX'
    );
    return result === 'OK';
  }

  async release(key: string, owner: string): Promise<boolean> {
    const lockKey = this.getKey(key);
    // Use Lua script to ensure atomic check-and-delete
    const script = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
      else
        return 0
      end
    `;
    const result = await this.redisService.getClient().eval(script, 1, lockKey, owner);
    return result === 1;
  }

  async extend(key: string, owner: string, ttlSeconds: number): Promise<boolean> {
    const lockKey = this.getKey(key);
    // Use Lua script to ensure atomic check-and-extend
    const script = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("expire", KEYS[1], ARGV[2])
      else
        return 0
      end
    `;
    const result = await this.redisService.getClient().eval(script, 1, lockKey, owner, ttlSeconds.toString());
    return result === 1;
  }

  async tryAcquire(key: string, owner: string, ttlSeconds: number): Promise<boolean> {
    // Try acquire is essentially the same as acquire in Redis with NX (set if not exists)
    return this.acquire(key, owner, ttlSeconds);
  }

  private getKey(key: string): string {
    return `${this.PREFIX}${key}`;
  }
}
