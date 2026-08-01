import { Injectable, Inject, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Membership } from '../domain/membership';
import { MembershipRepository, MEMBERSHIP_REPOSITORY } from '../repositories/membership.repository';
import { TenantContext } from '../domain/tenant-context';

@Injectable()
export class MembershipService {
  constructor(
    @Inject(MEMBERSHIP_REPOSITORY) private readonly membershipRepository: MembershipRepository,
  ) {}

  public async getMembership(userId: string, organizationId: string): Promise<Membership> {
    const membership = await this.membershipRepository.findByUserAndOrganization(userId, organizationId);
    if (!membership) {
      throw new NotFoundException('Membership not found');
    }
    return membership;
  }

  public async validateMembership(userId: string, organizationId: string): Promise<TenantContext> {
    const membership = await this.getMembership(userId, organizationId);
    
    if (membership.status !== 'ACTIVE') {
      throw new ForbiddenException('Membership is not active');
    }

    return {
      tenantId: organizationId,
      organizationId,
      membershipId: membership.id,
      currentHotelId: membership.lastSelectedContext || membership.defaultHotelId,
      currentDepartmentId: membership.defaultDepartmentId,
    };
  }

  public async listUserMemberships(userId: string): Promise<Membership[]> {
    return this.membershipRepository.findByUserId(userId);
  }
}
