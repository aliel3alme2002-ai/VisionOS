import { Injectable, CanActivate, ExecutionContext, ForbiddenException as NestForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { RequestContext } from '../../../application/common/middleware/request-context';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ reqContext?: RequestContext }>();
    const userPermissions = request.reqContext?.permissions || [];

    const hasPermission = requiredPermissions.every((perm) => userPermissions.includes(perm));
    if (!hasPermission) {
      throw new NestForbiddenException('Insufficient permissions');
    }

    return true;
  }
}
