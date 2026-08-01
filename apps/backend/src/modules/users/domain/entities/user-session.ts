export interface UserSessionProps {
  sessionId: string;
  deviceName?: string | null;
  deviceType?: string | null;
  browser?: string | null;
  operatingSystem?: string | null;
  ipAddress?: string | null;
  lastActivity?: Date;
  expiresAt: Date;
}

export class UserSession {
  public readonly sessionId: string;
  public readonly deviceName: string | null;
  public readonly deviceType: string | null;
  public readonly browser: string | null;
  public readonly operatingSystem: string | null;
  public readonly ipAddress: string | null;
  public readonly lastActivity: Date;
  public readonly expiresAt: Date;

  constructor(props: UserSessionProps) {
    this.sessionId = props.sessionId;
    this.deviceName = props.deviceName ?? null;
    this.deviceType = props.deviceType ?? null;
    this.browser = props.browser ?? null;
    this.operatingSystem = props.operatingSystem ?? null;
    this.ipAddress = props.ipAddress ?? null;
    this.lastActivity = props.lastActivity ?? new Date();
    this.expiresAt = props.expiresAt;
  }

  public isExpired(): boolean {
    return new Date() > this.expiresAt;
  }
}
