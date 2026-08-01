import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ForcePasswordResetCommand } from './force-password-reset.command';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@CommandHandler(ForcePasswordResetCommand)
export class ForcePasswordResetHandler
  implements BaseCommandHandler<ForcePasswordResetCommand, void>, ICommandHandler<ForcePasswordResetCommand>
{
  constructor(@Inject('IUserRepository') private readonly repository: IUserRepository) {}

  async execute(command: ForcePasswordResetCommand): Promise<void> {
    const user = await this.repository.findById(command.id);
    if (!user) throw new NotFoundException(`User with ID '${command.id}' not found.`);
    user.forcePasswordReset();
    await this.repository.save(user);
  }
}
