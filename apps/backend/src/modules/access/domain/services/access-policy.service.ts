import { Injectable, Inject } from '@nestjs/common';
import { IRoleRepository } from '../repositories/role.repository';
import { ConflictException } from '../../../application/common/exceptions/conflict.exception';
import { ForbiddenException } from '../../../application/common/exceptions/forbidden.exception';

@Injectable()
export class AccessPolicyService {
  constructor(
    @Inject('IRoleRepository') private readonly roleRepository: IRoleRepository,
  ) {}

  public async validateUniqueRoleName(name: string, organizationId?: string | null): Promise<void> {
    const existing = await this.roleRepository.findByName(name, organizationId);
    if (existing) {
      throw new ConflictException(`Role with name '${name}' already exists.`);
    }
  }

  public validateSystemRoleMutation(role: { systemRole: boolean }): void {
    if (role.systemRole) {
      throw new ForbiddenException('System roles are immutable and cannot be mutated or deleted.');
    }
  }
}
