import { Controller, Post, Get, Put, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { BaseController } from '../../api/common/controllers/base.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '../../application/common/dto/api-response';

import { CreateCameraDto } from '../dto/create-camera.dto';
import { UpdateCameraDto, MoveCameraDto } from '../dto/update-camera.dto';
import { CameraResponseDto } from '../dto/camera-response.dto';

import { CreateCameraCommand } from '../application/commands/create-camera/create-camera.command';
import { UpdateCameraCommand } from '../application/commands/update-camera/update-camera.command';
import { DeleteCameraCommand } from '../application/commands/delete-camera/delete-camera.command';
import { MoveCameraCommand } from '../application/commands/move-camera/move-camera.command';

import { GetCameraQuery } from '../application/queries/get-camera/get-camera.query';
import { ListCamerasQuery } from '../application/queries/list-cameras/list-cameras.query';

@Controller('vision/cameras')
export class CamerasController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateCameraDto): Promise<ApiResponse<CameraResponseDto>> {
    const command = new CreateCameraCommand(dto);
    const result = await this.commandBus.execute<CreateCameraCommand, CameraResponseDto>(command);
    return this.success(result);
  }

  @Get()
  async list(
    @Query('organizationId') organizationId: string,
    @Query('includeDeleted') includeDeleted?: string,
  ): Promise<ApiResponse<CameraResponseDto[]>> {
    const query = new ListCamerasQuery(organizationId, includeDeleted === 'true');
    const result = await this.queryBus.execute<ListCamerasQuery, CameraResponseDto[]>(query);
    return this.success(result);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ApiResponse<CameraResponseDto>> {
    const query = new GetCameraQuery(id);
    const result = await this.queryBus.execute<GetCameraQuery, CameraResponseDto>(query);
    return this.success(result);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCameraDto,
  ): Promise<ApiResponse<CameraResponseDto>> {
    const command = new UpdateCameraCommand(id, dto);
    const result = await this.commandBus.execute<UpdateCameraCommand, CameraResponseDto>(command);
    return this.success(result);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    const command = new DeleteCameraCommand(id);
    await this.commandBus.execute(command);
  }

  @Post(':id/move')
  @HttpCode(HttpStatus.OK)
  async moveCamera(
    @Param('id') id: string,
    @Body() dto: MoveCameraDto,
  ): Promise<ApiResponse<CameraResponseDto>> {
    const command = new MoveCameraCommand(id, dto.targetEdgeNodeId ?? null);
    const result = await this.commandBus.execute<MoveCameraCommand, CameraResponseDto>(command);
    return this.success(result);
  }
}
