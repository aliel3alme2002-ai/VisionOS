import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ForgotPasswordCommand } from './forgot-password.command';
import { NotImplementedException } from '@nestjs/common';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordHandler implements BaseCommandHandler<ForgotPasswordCommand, void>, ICommandHandler<ForgotPasswordCommand> {
  async execute(_command: ForgotPasswordCommand): Promise<void> {
    throw new NotImplementedException('Forgot password logic not yet implemented');
  }
}
