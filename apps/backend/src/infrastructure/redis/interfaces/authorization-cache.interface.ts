export interface AuthorizationCache {
  saveAuthorization(identityId: string, data: any): Promise<void>;
  findAuthorization(identityId: string): Promise<any | null>;
  invalidateIdentity(identityId: string): Promise<void>;
  invalidateOrganization(organizationId: string): Promise<void>;
}
