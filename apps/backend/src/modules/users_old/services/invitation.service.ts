import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { Invitation } from '../domain/invitation';
import { InvitationRepository, INVITATION_REPOSITORY } from '../repositories/invitation.repository';
import { randomBytes } from 'node:crypto';

@Injectable()
export class InvitationService {
  constructor(
    @Inject(INVITATION_REPOSITORY) private readonly invitationRepository: InvitationRepository,
  ) {}

  public async createInvitation(organizationId: string, email: string, invitedBy: string): Promise<Invitation> {
    const existing = await this.invitationRepository.findByEmailAndOrganization(email, organizationId);
    if (existing && existing.status === 'PENDING') {
      if (existing.expiresAt > new Date()) {
        return existing; // Already invited
      }
    }

    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiry

    const invitation: Invitation = {
      id: randomBytes(16).toString('hex'),
      organizationId,
      email,
      invitedBy,
      token,
      expiresAt,
      status: 'PENDING',
    };

    await this.invitationRepository.create(invitation);
    return invitation;
  }

  public async validateInvitation(token: string): Promise<Invitation> {
    const invitation = await this.invitationRepository.findByToken(token);
    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    if (invitation.status !== 'PENDING') {
      throw new BadRequestException('Invitation is no longer pending');
    }

    if (invitation.expiresAt < new Date()) {
      throw new BadRequestException('Invitation has expired');
    }

    return invitation;
  }

  public async acceptInvitation(token: string): Promise<Invitation> {
    const invitation = await this.validateInvitation(token);
    const accepted: Invitation = { ...invitation, status: 'ACCEPTED' };
    await this.invitationRepository.update(accepted);
    return accepted;
  }

  public async rejectInvitation(token: string): Promise<Invitation> {
    const invitation = await this.validateInvitation(token);
    const rejected: Invitation = { ...invitation, status: 'REVOKED' };
    await this.invitationRepository.update(rejected);
    return rejected;
  }
}
