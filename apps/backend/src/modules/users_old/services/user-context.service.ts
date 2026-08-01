import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserContext } from '../domain/user-context';
import { Identity } from '../../auth/domain/identity';
import { MembershipService } from '../../organization/services/membership.service';
import { PermissionResolver } from '../../rbac/services/permission.resolver';

@Injectable()
export class UserContextService {
  constructor(
    private readonly membershipService: MembershipService,
    private readonly permissionResolver: PermissionResolver,
  ) {}

  public async buildContext(identity: Identity): Promise<UserContext> {
    if (!identity.tenantId) {
      // Global context (e.g. Super Admin without a specific tenant)
      const authzContext = await this.permissionResolver.resolve(identity);
      return {
        identity,
        membership: null,
        tenantContext: null,
        authorizationContext: authzContext,
      };
    }

    try {
      // Tenant context
      const membership = await this.membershipService.getMembership(identity.userId, identity.tenantId);
      const tenantContext = await this.membershipService.validateMembership(identity.userId, identity.tenantId);
      const authzContext = await this.permissionResolver.resolve(identity);

      return {
        identity,
        membership,
        tenantContext,
        authorizationContext: authzContext,
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid organization context');
    }
  }
}
