export const AUTH_AUDIT_SERVICE = Symbol('AUTH_AUDIT_SERVICE');

export interface AuthAuditService {
  logLogin(userId: string, sessionId: string, ipAddress?: string): Promise<void>;
  logFailure(email: string, reason: string, ipAddress?: string): Promise<void>;
  logSessionCreated(sessionId: string, userId: string): Promise<void>;
  logRefresh(userId: string, sessionId: string, ipAddress?: string): Promise<void>;
  logRefreshReuse(userId: string, sessionId: string, ipAddress?: string): Promise<void>;
  logSessionRevoked(sessionId: string, userId: string, reason: string): Promise<void>;
  logSessionExpired(sessionId: string, userId: string): Promise<void>;
  logSessionCompromised(sessionId: string, userId: string): Promise<void>;
  logSessionViewed(sessionId: string, userId: string): Promise<void>;
}
