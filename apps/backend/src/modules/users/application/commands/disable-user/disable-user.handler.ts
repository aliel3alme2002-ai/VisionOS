import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DisableUserCommand } from './disable-user.command';
import { UserResponseDto } from '../../../dto/user-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@CommandHandler(DisableUserCommand)
export class DisableUserHandler
  implements BaseCommandHandler<DisableUserCommand, UserResponseDto>, ICommandHandler<DisableUserCommand>
{
  constructor(@Inject('IUserRepository') private readonly repository: IUserRepository) {}

  async execute(command: DisableUserCommand): Promise<UserResponseDto> {
    const user = await this.repository.findById(command.id);
    if (!user) throw new NotFoundException(`User with ID '${command.id}' not found.`);
    user.disable();
    await this.repository.save(user);
    return UserResponseDto.fromEntity(user);
  }
}
