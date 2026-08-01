import { Invitation } from '../domain/invitation';

export const INVITATION_REPOSITORY = Symbol('INVITATION_REPOSITORY');

export interface InvitationRepository {
  findById(id: string): Promise<Invitation | null>;
  findByToken(token: string): Promise<Invitation | null>;
  findByEmailAndOrganization(email: string, organizationId: string): Promise<Invitation | null>;
  create(invitation: Invitation): Promise<void>;
  update(invitation: Invitation): Promise<void>;
}
