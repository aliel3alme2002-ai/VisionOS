import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LogoutCommand } from './logout.command';
import { NotImplementedException } from '@nestjs/common';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';

@CommandHandler(LogoutCommand)
export class LogoutHandler implements BaseCommandHandler<LogoutCommand, void>, ICommandHandler<LogoutCommand> {
  async execute(_command: LogoutCommand): Promise<void> {
    throw new NotImplementedException('Logout logic not yet implemented');
  }
}
