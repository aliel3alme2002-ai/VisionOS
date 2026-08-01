import { Injectable, Inject } from '@nestjs/common';
import { IOrganizationRepository } from '../repositories/organization.repository';
import { ConflictException } from '../../../application/common/exceptions/conflict.exception';

@Injectable()
export class OrganizationPolicyService {
  constructor(
    @Inject('IOrganizationRepository')
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  public async validateUniqueSlug(slug: string): Promise<void> {
    const exists = await this.organizationRepository.existsBySlug(slug);
    if (exists) {
      throw new ConflictException(`Organization slug '${slug}' is already taken.`);
    }
  }
}
