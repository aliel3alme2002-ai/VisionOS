import { Injectable, CanActivate, ExecutionContext, UnauthorizedException as NestUnauthorizedException } from '@nestjs/common';
import { RequestContext } from '../../../application/common/middleware/request-context';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ reqContext?: RequestContext; user?: unknown }>();
    const isAuthenticated = Boolean(request.user || request.reqContext?.userId);
    if (!isAuthenticated) {
      throw new NestUnauthorizedException('Authentication required');
    }
    return true;
  }
}
