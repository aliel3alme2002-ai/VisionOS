export class UserLoggedIn {
  constructor(
    public readonly userId: string,
    public readonly tenantId: string | undefined,
    public readonly sessionId: string,
    public readonly timestamp: Date,
  ) {}
}

export class LoginFailed {
  constructor(
    public readonly email: string,
    public readonly reason: 'USER_NOT_FOUND' | 'INVALID_PASSWORD' | 'INACTIVE' | 'LOCKED' | 'PENDING_VERIFICATION',
    public readonly ipAddress: string | undefined,
    public readonly timestamp: Date,
  ) {}
}

export class SessionCreated {
  constructor(
    public readonly sessionId: string,
    public readonly userId: string,
    public readonly timestamp: Date,
  ) {}
}

export class RefreshTokenRotated {
  constructor(
    public readonly userId: string,
    public readonly tenantId: string | undefined,
    public readonly sessionId: string,
    public readonly occurredAt: Date,
    public readonly ipAddress?: string,
    public readonly userAgent?: string,
  ) {}
}

export class RefreshTokenReuseDetected {
  constructor(
    public readonly userId: string,
    public readonly tenantId: string | undefined,
    public readonly sessionId: string,
    public readonly occurredAt: Date,
    public readonly ipAddress?: string,
    public readonly userAgent?: string,
  ) {}
}

export class SessionUpdated {
  constructor(
    public readonly userId: string,
    public readonly tenantId: string | undefined,
    public readonly sessionId: string,
    public readonly occurredAt: Date,
    public readonly ipAddress?: string,
    public readonly userAgent?: string,
  ) {}
}

export class SessionRevoked {
  constructor(
    public readonly userId: string,
    public readonly tenantId: string | undefined,
    public readonly sessionId: string,
    public readonly occurredAt: Date,
    public readonly severity: 'INFO' | 'WARNING' | 'CRITICAL',
    public readonly ipAddress?: string,
    public readonly userAgent?: string,
  ) {}
}

export class SessionExpired {
  constructor(
    public readonly userId: string,
    public readonly tenantId: string | undefined,
    public readonly sessionId: string,
    public readonly occurredAt: Date,
    public readonly severity: 'INFO' | 'WARNING' | 'CRITICAL',
  ) {}
}

export class SessionCompromised {
  constructor(
    public readonly userId: string,
    public readonly tenantId: string | undefined,
    public readonly sessionId: string,
    public readonly occurredAt: Date,
    public readonly severity: 'CRITICAL',
  ) {}
}

export class SessionActivityUpdated {
  constructor(
    public readonly userId: string,
    public readonly tenantId: string | undefined,
    public readonly sessionId: string,
    public readonly occurredAt: Date,
    public readonly severity: 'INFO',
  ) {}
}

export class SessionViewed {
  constructor(
    public readonly userId: string,
    public readonly tenantId: string | undefined,
    public readonly sessionId: string,
    public readonly occurredAt: Date,
    public readonly severity: 'INFO',
  ) {}
}
