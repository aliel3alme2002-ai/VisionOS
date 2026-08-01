import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class RedisHealthService {
  constructor(private readonly redisService: RedisService) {}

  async ping(): Promise<string> {
    try {
      const result = await this.redisService.getClient().ping();
      return result;
    } catch (error) {
      return 'ERROR';
    }
  }

  async isHealthy(): Promise<boolean> {
    const result = await this.ping();
    return result === 'PONG';
  }
}
