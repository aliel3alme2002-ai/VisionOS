import { Controller, Post, Get, Put, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { BaseController } from '../../api/common/controllers/base.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '../../application/common/dto/api-response';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { UserProfileDto } from '../dto/user-profile.dto';
import { UserPreferencesDto } from '../dto/user-preferences.dto';
import { InviteUserDto, AcceptInvitationDto } from '../dto/invite-user.dto';

import { CreateUserCommand } from '../application/commands/create-user/create-user.command';
import { UpdateUserCommand } from '../application/commands/update-user/update-user.command';
import { DisableUserCommand } from '../application/commands/disable-user/disable-user.command';
import { EnableUserCommand } from '../application/commands/enable-user/enable-user.command';
import { DeleteUserCommand } from '../application/commands/delete-user/delete-user.command';
import { RestoreUserCommand } from '../application/commands/restore-user/restore-user.command';
import { InviteUserCommand } from '../application/commands/invite-user/invite-user.command';
import { AcceptInvitationCommand } from '../application/commands/accept-invitation/accept-invitation.command';
import { ForcePasswordResetCommand } from '../application/commands/force-password-reset/force-password-reset.command';
import { UpdateProfileCommand } from '../application/commands/update-profile/update-profile.command';
import { UpdatePreferencesCommand } from '../application/commands/update-preferences/update-preferences.command';
import { UploadAvatarCommand } from '../application/commands/upload-avatar/upload-avatar.command';

import { GetUserQuery } from '../application/queries/get-user/get-user.query';
import { ListUsersQuery } from '../application/queries/list-users/list-users.query';
import { GetProfileQuery } from '../application/queries/get-profile/get-profile.query';
import { GetSessionsQuery } from '../application/queries/get-sessions/get-sessions.query';

@Controller('users')
export class UsersController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDto): Promise<ApiResponse<UserResponseDto>> {
    const command = new CreateUserCommand(dto.organizationId, dto.email, dto.displayName);
    const result = await this.commandBus.execute<CreateUserCommand, UserResponseDto>(command);
    return this.success(result);
  }

  @Get()
  async list(
    @Query('organizationId') organizationId?: string,
    @Query('includeDeleted') includeDeleted?: string,
  ): Promise<ApiResponse<UserResponseDto[]>> {
    const query = new ListUsersQuery(organizationId, includeDeleted === 'true');
    const result = await this.queryBus.execute<ListUsersQuery, UserResponseDto[]>(query);
    return this.success(result);
  }

  @Post('invite')
  @HttpCode(HttpStatus.OK)
  async invite(@Body() dto: InviteUserDto): Promise<ApiResponse<UserResponseDto>> {
    const command = new InviteUserCommand(dto.organizationId, dto.email, dto.displayName);
    const result = await this.commandBus.execute<InviteUserCommand, UserResponseDto>(command);
    return this.success(result);
  }

  @Post('invitations/accept')
  @HttpCode(HttpStatus.OK)
  async acceptInvitation(@Body() dto: AcceptInvitationDto): Promise<ApiResponse<UserResponseDto>> {
    const command = new AcceptInvitationCommand(dto.token, dto.displayName);
    const result = await this.commandBus.execute<AcceptInvitationCommand, UserResponseDto>(command);
    return this.success(result);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ApiResponse<UserResponseDto>> {
    const query = new GetUserQuery(id);
    const result = await this.queryBus.execute<GetUserQuery, UserResponseDto>(query);
    return this.success(result);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<ApiResponse<UserResponseDto>> {
    const command = new UpdateUserCommand(id, dto.displayName);
    const result = await this.commandBus.execute<UpdateUserCommand, UserResponseDto>(command);
    return this.success(result);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    const command = new DeleteUserCommand(id);
    await this.commandBus.execute(command);
  }

  @Post(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(@Param('id') id: string): Promise<ApiResponse<UserResponseDto>> {
    const command = new RestoreUserCommand(id);
    const result = await this.commandBus.execute<RestoreUserCommand, UserResponseDto>(command);
    return this.success(result);
  }

  @Put(':id/profile')
  async updateProfile(
    @Param('id') id: string,
    @Body() dto: UserProfileDto,
  ): Promise<ApiResponse<UserResponseDto>> {
    const command = new UpdateProfileCommand(id, dto);
    const result = await this.commandBus.execute<UpdateProfileCommand, UserResponseDto>(command);
    return this.success(result);
  }

  @Get(':id/profile')
  async getProfile(@Param('id') id: string): Promise<ApiResponse<any>> {
    const query = new GetProfileQuery(id);
    const result = await this.queryBus.execute<GetProfileQuery, any>(query);
    return this.success(result);
  }

  @Put(':id/preferences')
  async updatePreferences(
    @Param('id') id: string,
    @Body() dto: UserPreferencesDto,
  ): Promise<ApiResponse<UserResponseDto>> {
    const command = new UpdatePreferencesCommand(id, dto);
    const result = await this.commandBus.execute<UpdatePreferencesCommand, UserResponseDto>(command);
    return this.success(result);
  }

  @Put(':id/avatar')
  async uploadAvatar(
    @Param('id') id: string,
    @Body() body: { storageObjectId: string; thumbnailUrl: string },
  ): Promise<ApiResponse<UserResponseDto>> {
    const command = new UploadAvatarCommand(id, body.storageObjectId, body.thumbnailUrl);
    const result = await this.commandBus.execute<UploadAvatarCommand, UserResponseDto>(command);
    return this.success(result);
  }

  @Post(':id/disable')
  @HttpCode(HttpStatus.OK)
  async disable(@Param('id') id: string): Promise<ApiResponse<UserResponseDto>> {
    const command = new DisableUserCommand(id);
    const result = await this.commandBus.execute<DisableUserCommand, UserResponseDto>(command);
    return this.success(result);
  }

  @Post(':id/enable')
  @HttpCode(HttpStatus.OK)
  async enable(@Param('id') id: string): Promise<ApiResponse<UserResponseDto>> {
    const command = new EnableUserCommand(id);
    const result = await this.commandBus.execute<EnableUserCommand, UserResponseDto>(command);
    return this.success(result);
  }

  @Post(':id/force-password-reset')
  @HttpCode(HttpStatus.NO_CONTENT)
  async forcePasswordReset(@Param('id') id: string): Promise<void> {
    const command = new ForcePasswordResetCommand(id);
    await this.commandBus.execute(command);
  }

  @Get(':id/sessions')
  async getSessions(@Param('id') id: string): Promise<ApiResponse<any[]>> {
    const query = new GetSessionsQuery(id);
    const result = await this.queryBus.execute<GetSessionsQuery, any[]>(query);
    return this.success(result);
  }
}
