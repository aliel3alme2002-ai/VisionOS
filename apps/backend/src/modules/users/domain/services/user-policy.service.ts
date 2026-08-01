import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository';
import { ConflictException } from '../../../application/common/exceptions/conflict.exception';
import { ForbiddenException } from '../../../application/common/exceptions/forbidden.exception';

@Injectable()
export class UserPolicyService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  public async validateUniqueEmailInOrg(email: string, organizationId: string): Promise<void> {
    const exists = await this.userRepository.existsByEmailInOrg(email, organizationId);
    if (exists) {
      throw new ConflictException(`User with email '${email}' already exists in organization '${organizationId}'.`);
    }
  }

  public validateCannotDisableOwner(userId: string, ownerId: string): void {
    if (userId === ownerId) {
      throw new ForbiddenException('Organization owner cannot be disabled or removed.');
    }
  }
}
