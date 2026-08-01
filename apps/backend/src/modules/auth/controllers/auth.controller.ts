import { Controller, Post, Body, Get, HttpCode, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { BaseController } from '../../api/common/controllers/base.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { LoginRequestDto } from '../dto/login-request.dto';
import { LoginResponseDto, UserInfoDto } from '../dto/login-response.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { LoginCommand } from '../application/commands/login/login.command';
import { LogoutCommand } from '../application/commands/logout/logout.command';
import { RefreshTokenCommand } from '../application/commands/refresh-token/refresh-token.command';
import { ChangePasswordCommand } from '../application/commands/change-password/change-password.command';
import { ForgotPasswordCommand } from '../application/commands/forgot-password/forgot-password.command';
import { ResetPasswordCommand } from '../application/commands/reset-password/reset-password.command';
import { MeQuery } from '../application/queries/me/me.query';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiResponse } from '../../application/common/dto/api-response';

@Controller('auth')
export class AuthController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginRequestDto): Promise<ApiResponse<LoginResponseDto>> {
    const command = new LoginCommand(dto.email, dto.password);
    const result = await this.commandBus.execute<LoginCommand, LoginResponseDto>(command);
    return this.success(result);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Request() req: any, @Body() dto: RefreshTokenDto): Promise<void> {
    const userId = req.user?.sub;
    const command = new LogoutCommand(userId, dto.refreshToken);
    await this.commandBus.execute(command);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() dto: RefreshTokenDto): Promise<ApiResponse<LoginResponseDto>> {
    const command = new RefreshTokenCommand(dto.refreshToken);
    const result = await this.commandBus.execute<RefreshTokenCommand, LoginResponseDto>(command);
    return this.success(result);
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async changePassword(@Request() req: any, @Body() dto: ChangePasswordDto): Promise<void> {
    const userId = req.user?.sub;
    const command = new ChangePasswordCommand(userId, dto.oldPassword, dto.newPassword);
    await this.commandBus.execute(command);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async forgotPassword(@Body() dto: ForgotPasswordDto): Promise<void> {
    const command = new ForgotPasswordCommand(dto.email);
    await this.commandBus.execute(command);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async resetPassword(@Body() dto: ResetPasswordDto): Promise<void> {
    const command = new ResetPasswordCommand(dto.token, dto.newPassword);
    await this.commandBus.execute(command);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Request() req: any): Promise<ApiResponse<UserInfoDto>> {
    const userId = req.user?.sub;
    const query = new MeQuery(userId);
    const result = await this.queryBus.execute<MeQuery, UserInfoDto>(query);
    return this.success(result);
  }
}
