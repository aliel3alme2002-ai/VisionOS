import { Injectable, Inject } from '@nestjs/common';
import { PasswordHasher } from '../contracts/password-hasher';
import { ValidationException } from '../../../application/common/exceptions/validation.exception';

@Injectable()
export class PasswordService {
  constructor(
    @Inject('PasswordHasher') private readonly hasher: PasswordHasher,
  ) {}

  public async hash(password: string): Promise<string> {
    this.validatePolicy(password);
    return this.hasher.hash(password);
  }

  public async compare(password: string, hash: string): Promise<boolean> {
    return this.hasher.compare(password, hash);
  }

  public validatePolicy(password: string): void {
    if (password.length < 8) {
      throw new ValidationException([{ field: 'password', message: 'Password must be at least 8 characters long' }]);
    }
    if (!/[A-Z]/.test(password)) {
      throw new ValidationException([{ field: 'password', message: 'Password must contain uppercase letter' }]);
    }
    if (!/[a-z]/.test(password)) {
      throw new ValidationException([{ field: 'password', message: 'Password must contain lowercase letter' }]);
    }
    if (!/[0-9]/.test(password)) {
      throw new ValidationException([{ field: 'password', message: 'Password must contain a number' }]);
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      throw new ValidationException([{ field: 'password', message: 'Password must contain a special character' }]);
    }
  }
}
