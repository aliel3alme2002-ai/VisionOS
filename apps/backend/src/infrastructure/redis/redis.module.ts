import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisHealthService } from '../health/redis-health.service';
import { SessionCacheService } from './cache/session-cache.service';
import { PermissionCacheService } from './cache/permission-cache.service';
import { AuthorizationCacheService } from './cache/authorization-cache.service';
import { DistributedLockService } from './locks/distributed-lock.service';
import { RateLimiterService } from './rate-limit/rate-limiter.service';

export const SESSION_CACHE = Symbol('SESSION_CACHE');
export const PERMISSION_CACHE = Symbol('PERMISSION_CACHE');
export const AUTHORIZATION_CACHE = Symbol('AUTHORIZATION_CACHE');
export const DISTRIBUTED_LOCK = Symbol('DISTRIBUTED_LOCK');
export const RATE_LIMITER = Symbol('RATE_LIMITER');

@Global()
@Module({
  providers: [
    RedisService,
    RedisHealthService,
    { provide: SESSION_CACHE, useClass: SessionCacheService },
    { provide: PERMISSION_CACHE, useClass: PermissionCacheService },
    { provide: AUTHORIZATION_CACHE, useClass: AuthorizationCacheService },
    { provide: DISTRIBUTED_LOCK, useClass: DistributedLockService },
    { provide: RATE_LIMITER, useClass: RateLimiterService },
  ],
  exports: [
    RedisService,
    RedisHealthService,
    SESSION_CACHE,
    PERMISSION_CACHE,
    AUTHORIZATION_CACHE,
    DISTRIBUTED_LOCK,
    RATE_LIMITER,
  ],
})
export class RedisModule {}
