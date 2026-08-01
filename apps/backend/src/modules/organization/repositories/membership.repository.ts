import { Membership } from '../domain/membership';

export const MEMBERSHIP_REPOSITORY = Symbol('MEMBERSHIP_REPOSITORY');

export interface MembershipRepository {
  findById(id: string): Promise<Membership | null>;
  findByUserId(userId: string): Promise<Membership[]>;
  findByUserAndOrganization(userId: string, organizationId: string): Promise<Membership | null>;
  create(membership: Membership): Promise<void>;
  update(membership: Membership): Promise<void>;
}
