import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InviteUserCommand } from './invite-user.command';
import { UserResponseDto } from '../../../dto/user-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { UserPolicyService } from '../../../domain/services/user-policy.service';
import { User } from '../../../domain/entities/user';
import { randomUUID } from 'crypto';

@CommandHandler(InviteUserCommand)
export class InviteUserHandler
  implements BaseCommandHandler<InviteUserCommand, UserResponseDto>, ICommandHandler<InviteUserCommand>
{
  constructor(
    @Inject('IUserRepository') private readonly repository: IUserRepository,
    private readonly policyService: UserPolicyService,
  ) {}

  async execute(command: InviteUserCommand): Promise<UserResponseDto> {
    await this.policyService.validateUniqueEmailInOrg(command.email, command.organizationId);
    const id = randomUUID();
    const user = User.invite(id, command.organizationId, command.email, command.displayName);
    await this.repository.save(user);
    return UserResponseDto.fromEntity(user);
  }
}
