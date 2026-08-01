import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis.service';
import { PermissionCache } from '../interfaces/permission-cache.interface';

@Injectable()
export class PermissionCacheService implements PermissionCache {
  private readonly PREFIX = 'role:permissions:';

  constructor(private readonly redisService: RedisService) {}

  async findRolePermissions(roleId: string): Promise<any[] | null> {
    const key = this.getKey(roleId);
    const value = await this.redisService.getClient().get(key);
    return value ? JSON.parse(value) : null;
  }

  async saveRolePermissions(roleId: string, permissions: any[]): Promise<void> {
    const key = this.getKey(roleId);
    await this.redisService.getClient().set(key, JSON.stringify(permissions));
  }

  async invalidateRole(roleId: string): Promise<void> {
    const key = this.getKey(roleId);
    await this.redisService.getClient().del(key);
  }

  async invalidateAll(): Promise<void> {
    const client = this.redisService.getClient();
    let cursor = '0';
    do {
      const result = await client.scan(cursor, 'MATCH', `${this.PREFIX}*`, 'COUNT', 100);
      cursor = result[0];
      const keys = result[1];
      if (keys.length > 0) {
        await client.del(...keys);
      }
    } while (cursor !== '0');
  }

  private getKey(roleId: string): string {
    return `${this.PREFIX}${roleId}`;
  }
}
