import { Controller, Post, Get, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { BaseController } from '../../api/common/controllers/base.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '../../application/common/dto/api-response';

import { CreatePermissionDto } from '../application/dto/create-permission.dto';
import { UpdatePermissionDto } from '../application/dto/update-permission.dto';
import { PermissionResponseDto } from '../application/dto/permission-response.dto';
import { CreatePermissionGroupDto } from '../application/dto/create-permission-group.dto';
import { PermissionGroupResponseDto } from '../application/dto/permission-group-response.dto';

import { CreatePermissionCommand } from '../application/commands/create-permission/create-permission.command';
import { UpdatePermissionCommand } from '../application/commands/update-permission/update-permission.command';
import { DeletePermissionCommand } from '../application/commands/delete-permission/delete-permission.command';
import { CreatePermissionGroupCommand } from '../application/commands/create-permission-group/create-permission-group.command';
import { AssignPermissionGroupCommand } from '../application/commands/assign-permission-group/assign-permission-group.command';

import { GetPermissionQuery } from '../application/queries/get-permission/get-permission.query';
import { ListPermissionsQuery } from '../application/queries/list-permissions/list-permissions.query';

@Controller('access/permissions')
export class PermissionsController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreatePermissionDto): Promise<ApiResponse<PermissionResponseDto>> {
    const command = new CreatePermissionCommand(dto.resource, dto.action, dto.scope, dto.description);
    const result = await this.commandBus.execute<CreatePermissionCommand, PermissionResponseDto>(command);
    return this.success(result);
  }

  @Get()
  async list(): Promise<ApiResponse<PermissionResponseDto[]>> {
    const query = new ListPermissionsQuery();
    const result = await this.queryBus.execute<ListPermissionsQuery, PermissionResponseDto[]>(query);
    return this.success(result);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ApiResponse<PermissionResponseDto>> {
    const query = new GetPermissionQuery(id);
    const result = await this.queryBus.execute<GetPermissionQuery, PermissionResponseDto>(query);
    return this.success(result);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePermissionDto,
  ): Promise<ApiResponse<PermissionResponseDto>> {
    const command = new UpdatePermissionCommand(id, dto.description);
    const result = await this.commandBus.execute<UpdatePermissionCommand, PermissionResponseDto>(command);
    return this.success(result);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    const command = new DeletePermissionCommand(id);
    await this.commandBus.execute(command);
  }

  @Post('groups')
  @HttpCode(HttpStatus.CREATED)
  async createGroup(@Body() dto: CreatePermissionGroupDto): Promise<ApiResponse<PermissionGroupResponseDto>> {
    const command = new CreatePermissionGroupCommand(dto.name, dto.description, dto.permissionIds);
    const result = await this.commandBus.execute<CreatePermissionGroupCommand, PermissionGroupResponseDto>(command);
    return this.success(result);
  }

  @Post('groups/:groupId/assign-to-role/:roleId')
  @HttpCode(HttpStatus.OK)
  async assignGroupToRole(
    @Param('groupId') groupId: string,
    @Param('roleId') roleId: string,
  ): Promise<void> {
    const command = new AssignPermissionGroupCommand(groupId, roleId);
    await this.commandBus.execute(command);
  }
}
