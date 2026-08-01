import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AcceptInvitationCommand } from './accept-invitation.command';
import { UserResponseDto } from '../../../dto/user-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@CommandHandler(AcceptInvitationCommand)
export class AcceptInvitationHandler
  implements BaseCommandHandler<AcceptInvitationCommand, UserResponseDto>, ICommandHandler<AcceptInvitationCommand>
{
  constructor(@Inject('IUserRepository') private readonly repository: IUserRepository) {}

  async execute(command: AcceptInvitationCommand): Promise<UserResponseDto> {
    const user = await this.repository.findById(command.userId);
    if (!user) throw new NotFoundException(`Invited user '${command.userId}' not found.`);
    user.acceptInvitation(command.displayName);
    await this.repository.save(user);
    return UserResponseDto.fromEntity(user);
  }
}
