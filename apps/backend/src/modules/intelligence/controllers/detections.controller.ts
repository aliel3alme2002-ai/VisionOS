import { Controller, Post, Get, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { BaseController } from '../../api/common/controllers/base.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '../../application/common/dto/api-response';

import { CreateDetectionDto } from '../dto/create-detection.dto';
import { DetectionResponseDto } from '../dto/detection-response.dto';

import { CreateDetectionCommand } from '../application/commands/create-detection/create-detection.command';
import { GetDetectionQuery } from '../application/queries/get-detection/get-detection.query';
import { ListDetectionsQuery } from '../application/queries/list-detections/list-detections.query';

@Controller('intelligence/detections')
export class DetectionsController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateDetectionDto): Promise<ApiResponse<DetectionResponseDto>> {
    const command = new CreateDetectionCommand(dto);
    const result = await this.commandBus.execute<CreateDetectionCommand, DetectionResponseDto>(command);
    return this.success(result);
  }

  @Get()
  async list(@Query('cameraId') cameraId: string): Promise<ApiResponse<DetectionResponseDto[]>> {
    const query = new ListDetectionsQuery(cameraId);
    const result = await this.queryBus.execute<ListDetectionsQuery, DetectionResponseDto[]>(query);
    return this.success(result);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ApiResponse<DetectionResponseDto>> {
    const query = new GetDetectionQuery(id);
    const result = await this.queryBus.execute<GetDetectionQuery, DetectionResponseDto>(query);
    return this.success(result);
  }
}
