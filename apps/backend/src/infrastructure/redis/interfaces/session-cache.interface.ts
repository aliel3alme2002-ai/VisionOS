export interface SessionCache {
  save(sessionId: string, data: any, ttl?: number): Promise<void>;
  find(sessionId: string): Promise<any | null>;
  remove(sessionId: string): Promise<void>;
  extend(sessionId: string, ttl: number): Promise<void>;
  invalidate(userId: string): Promise<void>;
}
