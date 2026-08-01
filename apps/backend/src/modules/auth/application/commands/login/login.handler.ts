import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { LoginResponseDto } from '../../../dto/login-response.dto';
import { NotImplementedException } from '@nestjs/common';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';

@CommandHandler(LoginCommand)
export class LoginHandler implements BaseCommandHandler<LoginCommand, LoginResponseDto>, ICommandHandler<LoginCommand> {
  async execute(_command: LoginCommand): Promise<LoginResponseDto> {
    throw new NotImplementedException('Login logic not yet implemented (Requires User Module)');
  }
}
