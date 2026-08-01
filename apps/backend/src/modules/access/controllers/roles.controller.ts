import { Controller, Post, Get, Put, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { BaseController } from '../../api/common/controllers/base.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '../../application/common/dto/api-response';

import { CreateRoleDto } from '../application/dto/create-role.dto';
import { UpdateRoleDto } from '../application/dto/update-role.dto';
import { AssignRoleDto, RemoveRoleDto } from '../application/dto/assign-role.dto';
import { RoleResponseDto } from '../application/dto/role-response.dto';

import { CreateRoleCommand } from '../application/commands/create-role/create-role.command';
import { UpdateRoleCommand } from '../application/commands/update-role/update-role.command';
import { DeleteRoleCommand } from '../application/commands/delete-role/delete-role.command';
import { RestoreRoleCommand } from '../application/commands/restore-role/restore-role.command';
import { AssignRoleCommand } from '../application/commands/assign-role/assign-role.command';
import { RemoveRoleCommand } from '../application/commands/remove-role/remove-role.command';

import { GetRoleQuery } from '../application/queries/get-role/get-role.query';
import { ListRolesQuery } from '../application/queries/list-roles/list-roles.query';

@Controller('access/roles')
export class RolesController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateRoleDto): Promise<ApiResponse<RoleResponseDto>> {
    const command = new CreateRoleCommand(dto.name, dto.organizationId, dto.description, dto.parentRoleId, dto.permissionIds);
    const result = await this.commandBus.execute<CreateRoleCommand, RoleResponseDto>(command);
    return this.success(result);
  }

  @Get()
  async list(
    @Query('organizationId') organizationId?: string,
    @Query('includeDeleted') includeDeleted?: string,
  ): Promise<ApiResponse<RoleResponseDto[]>> {
    const query = new ListRolesQuery(organizationId, includeDeleted === 'true');
    const result = await this.queryBus.execute<ListRolesQuery, RoleResponseDto[]>(query);
    return this.success(result);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ApiResponse<RoleResponseDto>> {
    const query = new GetRoleQuery(id);
    const result = await this.queryBus.execute<GetRoleQuery, RoleResponseDto>(query);
    return this.success(result);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateRoleDto,
  ): Promise<ApiResponse<RoleResponseDto>> {
    const command = new UpdateRoleCommand(id, dto.name, dto.description, dto.permissionIds);
    const result = await this.commandBus.execute<UpdateRoleCommand, RoleResponseDto>(command);
    return this.success(result);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    const command = new DeleteRoleCommand(id);
    await this.commandBus.execute(command);
  }

  @Post(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(@Param('id') id: string): Promise<ApiResponse<RoleResponseDto>> {
    const command = new RestoreRoleCommand(id);
    const result = await this.commandBus.execute<RestoreRoleCommand, RoleResponseDto>(command);
    return this.success(result);
  }

  @Post('assign')
  @HttpCode(HttpStatus.OK)
  async assignRole(@Body() dto: AssignRoleDto): Promise<void> {
    const expiresAt = dto.expiresAt ? new Date(dto.expiresAt) : undefined;
    const command = new AssignRoleCommand(dto.userId, dto.roleId, dto.organizationId, dto.assignedBy, expiresAt);
    await this.commandBus.execute(command);
  }

  @Post('remove')
  @HttpCode(HttpStatus.OK)
  async removeRole(@Body() dto: RemoveRoleDto): Promise<void> {
    const command = new RemoveRoleCommand(dto.userId, dto.roleId, dto.organizationId);
    await this.commandBus.execute(command);
  }
}
