export interface UserSecurityProps {
  mfaEnabled?: boolean;
  passwordChangedAt?: Date | null;
  failedLoginAttempts?: number;
  lockedUntil?: Date | null;
}

export class UserSecurity {
  public readonly mfaEnabled: boolean;
  public readonly passwordChangedAt: Date | null;
  public readonly failedLoginAttempts: number;
  public readonly lockedUntil: Date | null;

  constructor(props?: UserSecurityProps) {
    this.mfaEnabled = props?.mfaEnabled ?? false;
    this.passwordChangedAt = props?.passwordChangedAt ?? null;
    this.failedLoginAttempts = props?.failedLoginAttempts ?? 0;
    this.lockedUntil = props?.lockedUntil ?? null;
  }

  public recordFailedLogin(maxAttempts = 5, lockDurationMinutes = 15): UserSecurity {
    const attempts = this.failedLoginAttempts + 1;
    let locked: Date | null = this.lockedUntil;
    if (attempts >= maxAttempts) {
      locked = new Date(Date.now() + lockDurationMinutes * 60 * 1000);
    }
    return new UserSecurity({
      mfaEnabled: this.mfaEnabled,
      passwordChangedAt: this.passwordChangedAt,
      failedLoginAttempts: attempts,
      lockedUntil: locked,
    });
  }

  public resetFailedAttempts(): UserSecurity {
    return new UserSecurity({
      mfaEnabled: this.mfaEnabled,
      passwordChangedAt: this.passwordChangedAt,
      failedLoginAttempts: 0,
      lockedUntil: null,
    });
  }

  public markPasswordChanged(): UserSecurity {
    return new UserSecurity({
      mfaEnabled: this.mfaEnabled,
      passwordChangedAt: new Date(),
      failedLoginAttempts: 0,
      lockedUntil: null,
    });
  }
}
