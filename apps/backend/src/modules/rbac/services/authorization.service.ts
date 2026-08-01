import { Injectable, ForbiddenException } from '@nestjs/common';
import { PermissionResolver } from './permission.resolver';
import { Identity } from '../../auth/domain/identity';

@Injectable()
export class AuthorizationService {
  constructor(private readonly permissionResolver: PermissionResolver) {}

  public async authorize(identity: Identity, requiredPermissions: string[]): Promise<void> {
    const context = await this.permissionResolver.resolve(identity);
    const hasAccess = this.checkAllPermissions(context.permissions, requiredPermissions);
    
    if (!hasAccess) {
      throw new ForbiddenException('Access denied');
    }
  }

  public async hasPermission(identity: Identity, permission: string): Promise<boolean> {
    const context = await this.permissionResolver.resolve(identity);
    return this.checkPermission(context.permissions, permission);
  }

  public async hasAnyPermission(identity: Identity, permissions: string[]): Promise<boolean> {
    const context = await this.permissionResolver.resolve(identity);
    return this.checkAnyPermission(context.permissions, permissions);
  }

  public async hasAllPermissions(identity: Identity, permissions: string[]): Promise<boolean> {
    const context = await this.permissionResolver.resolve(identity);
    return this.checkAllPermissions(context.permissions, permissions);
  }

  private checkPermission(grantedPermissions: string[], requiredPermission: string): boolean {
    if (grantedPermissions.includes('*')) return true; // Super Admin wildcard

    for (const granted of grantedPermissions) {
      if (this.matchWildcard(granted, requiredPermission)) {
        return true;
      }
    }
    return false;
  }

  private checkAnyPermission(grantedPermissions: string[], requiredPermissions: string[]): boolean {
    return requiredPermissions.some(req => this.checkPermission(grantedPermissions, req));
  }

  private checkAllPermissions(grantedPermissions: string[], requiredPermissions: string[]): boolean {
    if (requiredPermissions.length === 0) return true;
    return requiredPermissions.every(req => this.checkPermission(grantedPermissions, req));
  }

  private matchWildcard(granted: string, required: string): boolean {
    if (granted === required) return true;
    
    if (granted.endsWith(':*')) {
      const prefix = granted.slice(0, -2);
      if (required.startsWith(prefix)) {
        return true;
      }
    }
    
    return false;
  }
}
