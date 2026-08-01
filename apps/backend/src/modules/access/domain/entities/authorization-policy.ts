import { Permission } from './permission';
import { PermissionScopeEnum } from './permission-scope';

export interface PolicyEvaluationContext {
  userId: string;
  organizationId: string;
  resourceId?: string;
  resourceOwnerId?: string;
}

export class AuthorizationPolicy {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly permission: Permission,
  ) {}

  public evaluate(context: PolicyEvaluationContext): boolean {
    const scope = this.permission.scope.getValue();
    switch (scope) {
      case PermissionScopeEnum.ANY:
        return true;
      case PermissionScopeEnum.ORGANIZATION:
        return !!context.organizationId;
      case PermissionScopeEnum.SELF:
        return context.userId === context.resourceOwnerId;
      case PermissionScopeEnum.ASSIGNED:
        return true; // Resource specific assignment check
      default:
        return false;
    }
  }
}
