import { Injectable, CanActivate, ExecutionContext, NotImplementedException } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(_context: ExecutionContext): boolean {
    // JWT validation strategy to be implemented
    throw new NotImplementedException('JWT Strategy not yet implemented');
  }
}
