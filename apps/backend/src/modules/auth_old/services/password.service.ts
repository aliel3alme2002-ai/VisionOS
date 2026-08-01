import { Injectable, Inject } from '@nestjs/common';
import * as argon2 from 'argon2';
import { VisionOSConfig } from '@visionos/config';
import { VISIONOS_CONFIG } from '../../../config/config.constants';

@Injectable()
export class PasswordService {
  constructor(
    @Inject(VISIONOS_CONFIG) private readonly config: VisionOSConfig,
  ) {}

  public async hash(password: string): Promise<string> {
    return argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: this.config.auth.argon2.memoryCost,
      timeCost: this.config.auth.argon2.timeCost,
      parallelism: this.config.auth.argon2.parallelism,
    });
  }

  public async verify(hash: string, plain: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, plain);
    } catch {
      return false;
    }
  }

  public async needsRehash(hash: string): Promise<boolean> {
    return argon2.needsRehash(hash, {
      memoryCost: this.config.auth.argon2.memoryCost,
      timeCost: this.config.auth.argon2.timeCost,
      parallelism: this.config.auth.argon2.parallelism,
    });
  }

  public validatePasswordStrength(password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const policy = this.config.auth.passwordPolicy;

    if (password.length < policy.minLength) {
      errors.push(`Password must be at least ${policy.minLength} characters long`);
    }
    if (policy.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (policy.requireLowercase && !/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (policy.requireNumber && !/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (policy.requireSpecial && !/[^A-Za-z0-9]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return { valid: errors.length === 0, errors };
  }
}
