import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthorizationService } from '../services/authorization.service';
import { Identity } from '../../auth/domain/identity';
import { REQUIRE_PERMISSIONS_KEY, REQUIRE_ANY_PERMISSION_KEY, REQUIRE_ALL_PERMISSIONS_KEY } from '../decorators/require-permissions.decorator';
import { IS_PUBLIC_KEY } from '../../auth/decorators/public.decorator';

@Injectable()
export class RBACGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authzService: AuthorizationService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const identity: Identity = request.user; // Set by JwtAuthGuard prior to RBACGuard

    if (!identity) {
      throw new ForbiddenException('Access denied');
    }

    const requireAll = this.reflector.getAllAndOverride<string[]>(REQUIRE_ALL_PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requireAll && requireAll.length > 0) {
      const hasAccess = await this.authzService.hasAllPermissions(identity, requireAll);
      if (!hasAccess) throw new ForbiddenException('Access denied');
      return true; // Fast exit if it passes
    }

    const requireAny = this.reflector.getAllAndOverride<string[]>(REQUIRE_ANY_PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requireAny && requireAny.length > 0) {
      const hasAccess = await this.authzService.hasAnyPermission(identity, requireAny);
      if (!hasAccess) throw new ForbiddenException('Access denied');
      return true;
    }

    // Default alias decorator for RequireAllPermissions to be simple
    const requirePermissions = this.reflector.getAllAndOverride<string[]>(REQUIRE_PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requirePermissions && requirePermissions.length > 0) {
      const hasAccess = await this.authzService.hasAllPermissions(identity, requirePermissions);
      if (!hasAccess) throw new ForbiddenException('Access denied');
      return true;
    }

    // Default Deny Rule: If no permissions are explicitly required, we strictly deny access, 
    // unless the endpoint is marked public. 
    // This enforces "Secure by Default".
    throw new ForbiddenException('Access denied');
  }
}
