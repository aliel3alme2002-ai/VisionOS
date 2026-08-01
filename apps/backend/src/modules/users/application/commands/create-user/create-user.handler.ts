import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateUserCommand } from './create-user.command';
import { UserResponseDto } from '../../../dto/user-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { UserPolicyService } from '../../../domain/services/user-policy.service';
import { User } from '../../../domain/entities/user';
import { randomUUID } from 'crypto';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  implements BaseCommandHandler<CreateUserCommand, UserResponseDto>, ICommandHandler<CreateUserCommand>
{
  constructor(
    @Inject('IUserRepository') private readonly repository: IUserRepository,
    private readonly policyService: UserPolicyService,
  ) {}

  async execute(command: CreateUserCommand): Promise<UserResponseDto> {
    await this.policyService.validateUniqueEmailInOrg(command.email, command.organizationId);
    const id = randomUUID();
    const user = User.create(id, command.organizationId, command.email, command.displayName);
    await this.repository.save(user);
    return UserResponseDto.fromEntity(user);
  }
}
