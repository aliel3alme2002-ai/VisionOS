import { Controller, Post, Get, Put, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { BaseController } from '../../api/common/controllers/base.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '../../application/common/dto/api-response';

import { CreateCameraGroupDto, CameraGroupResponseDto } from '../dto/camera-group.dto';
import { CreateCameraGroupCommand } from '../application/commands/create-camera-group/create-camera-group.command';
import { UpdateCameraGroupCommand } from '../application/commands/update-camera-group/update-camera-group.command';
import { DeleteCameraGroupCommand } from '../application/commands/delete-camera-group/delete-camera-group.command';

import { GetCameraGroupQuery } from '../application/queries/get-camera-group/get-camera-group.query';
import { ListCameraGroupsQuery } from '../application/queries/list-camera-groups/list-camera-groups.query';

@Controller('vision/camera-groups')
export class CameraGroupsController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateCameraGroupDto): Promise<ApiResponse<CameraGroupResponseDto>> {
    const command = new CreateCameraGroupCommand(dto);
    const result = await this.commandBus.execute<CreateCameraGroupCommand, CameraGroupResponseDto>(command);
    return this.success(result);
  }

  @Get()
  async list(@Query('organizationId') organizationId: string): Promise<ApiResponse<CameraGroupResponseDto[]>> {
    const query = new ListCameraGroupsQuery(organizationId);
    const result = await this.queryBus.execute<ListCameraGroupsQuery, CameraGroupResponseDto[]>(query);
    return this.success(result);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ApiResponse<CameraGroupResponseDto>> {
    const query = new GetCameraGroupQuery(id);
    const result = await this.queryBus.execute<GetCameraGroupQuery, CameraGroupResponseDto>(query);
    return this.success(result);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name?: string; description?: string },
  ): Promise<ApiResponse<CameraGroupResponseDto>> {
    const command = new UpdateCameraGroupCommand(id, body.name, body.description);
    const result = await this.commandBus.execute<UpdateCameraGroupCommand, CameraGroupResponseDto>(command);
    return this.success(result);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    const command = new DeleteCameraGroupCommand(id);
    await this.commandBus.execute(command);
  }
}
