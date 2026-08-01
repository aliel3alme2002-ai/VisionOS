import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RefreshTokenCommand } from './refresh-token.command';
import { LoginResponseDto } from '../../../dto/login-response.dto';
import { NotImplementedException } from '@nestjs/common';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler implements BaseCommandHandler<RefreshTokenCommand, LoginResponseDto>, ICommandHandler<RefreshTokenCommand> {
  async execute(_command: RefreshTokenCommand): Promise<LoginResponseDto> {
    throw new NotImplementedException('Refresh token logic not yet implemented');
  }
}
