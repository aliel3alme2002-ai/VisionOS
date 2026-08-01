import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis.service';
import { SessionCache } from '../interfaces/session-cache.interface';

@Injectable()
export class SessionCacheService implements SessionCache {
  private readonly PREFIX = 'session:';

  constructor(private readonly redisService: RedisService) {}

  async save(sessionId: string, data: any, ttl?: number): Promise<void> {
    const key = this.getKey(sessionId);
    const value = JSON.stringify(data);
    
    if (ttl) {
      await this.redisService.getClient().set(key, value, 'EX', ttl);
    } else {
      await this.redisService.getClient().set(key, value);
    }
  }

  async find(sessionId: string): Promise<any | null> {
    const key = this.getKey(sessionId);
    const value = await this.redisService.getClient().get(key);
    return value ? JSON.parse(value) : null;
  }

  async remove(sessionId: string): Promise<void> {
    const key = this.getKey(sessionId);
    await this.redisService.getClient().del(key);
  }

  async extend(sessionId: string, ttl: number): Promise<void> {
    const key = this.getKey(sessionId);
    await this.redisService.getClient().expire(key, ttl);
  }

  async invalidate(userId: string): Promise<void> {
    // This requires tracking sessions per user. In a real scenario, we might keep a set of sessions per user.
    // For now, this would just be a stub or rely on scanning, but scanning is slow.
    // Given the interfaces don't explicitly require complex indexing, we'll implement a scan for simplicity
    // or assume we use a pattern like session:user:* if the key contained user.
    // But the key is session:sessionId.
    // We'll leave a comment that this needs a reverse index (userId -> sessionIds) for O(1) invalidation.
    // For MVP, we will scan keys and deserialize to check userId, though inefficient.
    // Let's implement a safe scan if needed, or simply log a warning.
    // To keep it strictly functional without O(N) penalties, we'll assume the system maintains a set of user sessions separately or we use it here.
    const client = this.redisService.getClient();
    let cursor = '0';
    do {
      const result = await client.scan(cursor, 'MATCH', `${this.PREFIX}*`, 'COUNT', 100);
      cursor = result[0];
      const keys = result[1];
      
      for (const key of keys) {
        const value = await client.get(key);
        if (value) {
          try {
            const parsed = JSON.parse(value);
            if (parsed.userId === userId) {
              await client.del(key);
            }
          } catch (e) {
            // ignore JSON parse errors
          }
        }
      }
    } while (cursor !== '0');
  }

  private getKey(sessionId: string): string {
    return `${this.PREFIX}${sessionId}`;
  }
}
