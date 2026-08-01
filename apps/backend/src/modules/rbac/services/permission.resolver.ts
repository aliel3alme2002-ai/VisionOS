import { Injectable, Inject } from '@nestjs/common';
import { Identity } from '../../auth/domain/identity';
import { AuthorizationContext } from '../domain/authorization-context';
import { PERMISSION_REPOSITORY, PermissionRepository } from '../repositories/permission.repository';
import { USER_ROLE_REPOSITORY, UserRoleRepository } from '../repositories/user-role.repository';

@Injectable()
export class PermissionResolver {
  constructor(
    @Inject(PERMISSION_REPOSITORY) private readonly permissionRepository: PermissionRepository,
    @Inject(USER_ROLE_REPOSITORY) private readonly userRoleRepository: UserRoleRepository,
  ) {}

  public async resolve(identity: Identity): Promise<AuthorizationContext> {
    // Identity contains roles passed from JWT (or they might be fetched from DB)
    // To be strict and secure, we fetch the authoritative roles from the DB for this tenant.
    // If the identity already has roles, we could rely on them, but checking DB ensures instant revocation.
    
    let roleIds: string[] = [];
    
    if (identity.roles && identity.roles.length > 0) {
      roleIds = identity.roles;
    } else {
      const userRoles = await this.userRoleRepository.findByUserId(identity.userId, identity.tenantId ?? null);
      roleIds = userRoles.map(ur => ur.roleId);
    }

    if (roleIds.length === 0) {
      return {
        identity,
        roles: [],
        permissions: [],
      };
    }

    const permissions = await this.permissionRepository.findByRoles(roleIds);
    const permissionIdentifiers = Array.from(new Set(permissions.map(p => p.identifier)));

    return {
      identity,
      roles: roleIds,
      permissions: permissionIdentifiers,
    };
  }
}
