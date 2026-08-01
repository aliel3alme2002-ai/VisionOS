import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ResetPasswordCommand } from './reset-password.command';
import { NotImplementedException } from '@nestjs/common';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordHandler implements BaseCommandHandler<ResetPasswordCommand, void>, ICommandHandler<ResetPasswordCommand> {
  async execute(_command: ResetPasswordCommand): Promise<void> {
    throw new NotImplementedException('Reset password logic not yet implemented');
  }
}
