import { Injectable, CanActivate, ExecutionContext, NotImplementedException } from '@nestjs/common';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  canActivate(_context: ExecutionContext): boolean {
    // Refresh token extraction and validation strategy to be implemented
    throw new NotImplementedException('Refresh Token Strategy not yet implemented');
  }
}
