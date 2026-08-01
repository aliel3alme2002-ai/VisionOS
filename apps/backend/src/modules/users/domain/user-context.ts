import { Identity } from '../../auth/domain/identity';
import { Membership } from '../../organization/domain/membership';
import { TenantContext } from '../../organization/domain/tenant-context';
import { AuthorizationContext } from '../../rbac/domain/authorization-context';

export interface UserContext {
  readonly identity: Identity;
  readonly membership: Membership | null;
  readonly tenantContext: TenantContext | null;
  readonly authorizationContext: AuthorizationContext | null;
}
