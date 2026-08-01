import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis, { RedisOptions } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client!: Redis;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.connect();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }

  private connect() {
    const host = this.configService.get<string>('REDIS_HOST', 'localhost');
    const port = this.configService.get<number>('REDIS_PORT', 6379);
    const password = this.configService.get<string>('REDIS_PASSWORD');
    const db = this.configService.get<number>('REDIS_DB', 0);
    const tls = this.configService.get<boolean>('REDIS_TLS', false);

    const options: RedisOptions = {
      host,
      port,
      password,
      db,
      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        this.logger.warn(`Retrying Redis connection in ${delay}ms...`);
        return delay;
      },
      maxRetriesPerRequest: 3,
    };

    if (tls) {
      options.tls = {};
    }

    this.client = new Redis(options);

    this.client.on('connect', () => this.logger.log('Redis connected'));
    this.client.on('error', (err) => this.logger.error('Redis connection error', err));
    this.client.on('close', () => this.logger.warn('Redis connection closed'));
    this.client.on('reconnecting', () => this.logger.log('Redis reconnecting'));
  }

  private async disconnect() {
    this.logger.log('Closing Redis connection...');
    if (this.client) {
      await this.client.quit();
    }
  }

  public getClient(): Redis {
    return this.client;
  }
}
