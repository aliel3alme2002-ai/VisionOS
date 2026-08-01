import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RestoreUserCommand } from './restore-user.command';
import { UserResponseDto } from '../../../dto/user-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@CommandHandler(RestoreUserCommand)
export class RestoreUserHandler
  implements BaseCommandHandler<RestoreUserCommand, UserResponseDto>, ICommandHandler<RestoreUserCommand>
{
  constructor(@Inject('IUserRepository') private readonly repository: IUserRepository) {}

  async execute(command: RestoreUserCommand): Promise<UserResponseDto> {
    const user = await this.repository.findById(command.id, true);
    if (!user) throw new NotFoundException(`User with ID '${command.id}' not found.`);
    user.restore();
    await this.repository.save(user);
    return UserResponseDto.fromEntity(user);
  }
}
