export interface DistributedLockService {
  acquire(key: string, owner: string, ttlSeconds: number): Promise<boolean>;
  release(key: string, owner: string): Promise<boolean>;
  extend(key: string, owner: string, ttlSeconds: number): Promise<boolean>;
  tryAcquire(key: string, owner: string, ttlSeconds: number): Promise<boolean>;
}
