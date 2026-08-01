import { Identity } from '../../auth/domain/identity';

export interface AuthorizationContext {
  readonly identity: Identity;
  readonly roles: string[]; // Role IDs or names assigned to the user
  readonly permissions: string[]; // Resolved permission identifiers (e.g., 'camera:view')
  readonly scopes?: string[]; // Future feature
}
