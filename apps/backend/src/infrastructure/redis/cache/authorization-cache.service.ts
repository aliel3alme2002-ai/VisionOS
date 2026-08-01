import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis.service';
import { AuthorizationCache } from '../interfaces/authorization-cache.interface';

@Injectable()
export class AuthorizationCacheService implements AuthorizationCache {
  private readonly PREFIX = 'auth:';

  constructor(private readonly redisService: RedisService) {}

  async saveAuthorization(identityId: string, data: any): Promise<void> {
    const key = this.getKey(identityId);
    await this.redisService.getClient().set(key, JSON.stringify(data));
  }

  async findAuthorization(identityId: string): Promise<any | null> {
    const key = this.getKey(identityId);
    const value = await this.redisService.getClient().get(key);
    return value ? JSON.parse(value) : null;
  }

  async invalidateIdentity(identityId: string): Promise<void> {
    const key = this.getKey(identityId);
    await this.redisService.getClient().del(key);
  }

  async invalidateOrganization(organizationId: string): Promise<void> {
    // Requires a reverse index or scan. Since authorization objects contain org ids, 
    // we would need to either keep a set of identities per org, or scan.
    // For MVP, we will do a scan.
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
            // Assuming the cached data has a tenantId or organizationId property
            if (parsed.tenantId === organizationId || parsed.organizationId === organizationId) {
              await client.del(key);
            }
          } catch (e) {
            // ignore JSON parse errors
          }
        }
      }
    } while (cursor !== '0');
  }

  private getKey(identityId: string): string {
    return `${this.PREFIX}${identityId}`;
  }
}
