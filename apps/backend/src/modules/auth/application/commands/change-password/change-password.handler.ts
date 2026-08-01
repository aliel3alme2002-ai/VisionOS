import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChangePasswordCommand } from './change-password.command';
import { NotImplementedException } from '@nestjs/common';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler implements BaseCommandHandler<ChangePasswordCommand, void>, ICommandHandler<ChangePasswordCommand> {
  async execute(_command: ChangePasswordCommand): Promise<void> {
    throw new NotImplementedException('Change password logic not yet implemented');
  }
}
