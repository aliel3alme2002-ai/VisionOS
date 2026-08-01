import { Controller, Post, Get, Put, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { BaseController } from '../../api/common/controllers/base.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '../../application/common/dto/api-response';

import { CreateModelDto } from '../dto/create-model.dto';
import { UpdateModelDto } from '../dto/update-model.dto';
import { CreateModelVersionDto } from '../dto/create-model-version.dto';
import { ModelResponseDto } from '../dto/model-response.dto';

import { CreateModelCommand } from '../application/commands/create-model/create-model.command';
import { UpdateModelCommand } from '../application/commands/update-model/update-model.command';
import { CreateModelVersionCommand } from '../application/commands/create-model-version/create-model-version.command';

import { GetModelQuery } from '../application/queries/get-model/get-model.query';
import { ListModelsQuery } from '../application/queries/list-models/list-models.query';

@Controller('ai/models')
export class ModelsController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateModelDto): Promise<ApiResponse<ModelResponseDto>> {
    const command = new CreateModelCommand(dto);
    const result = await this.commandBus.execute<CreateModelCommand, ModelResponseDto>(command);
    return this.success(result);
  }

  @Get()
  async list(@Query('organizationId') organizationId: string): Promise<ApiResponse<ModelResponseDto[]>> {
    const query = new ListModelsQuery(organizationId);
    const result = await this.queryBus.execute<ListModelsQuery, ModelResponseDto[]>(query);
    return this.success(result);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ApiResponse<ModelResponseDto>> {
    const query = new GetModelQuery(id);
    const result = await this.queryBus.execute<GetModelQuery, ModelResponseDto>(query);
    return this.success(result);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateModelDto,
  ): Promise<ApiResponse<ModelResponseDto>> {
    const command = new UpdateModelCommand(id, dto);
    const result = await this.commandBus.execute<UpdateModelCommand, ModelResponseDto>(command);
    return this.success(result);
  }

  @Post(':id/versions')
  @HttpCode(HttpStatus.CREATED)
  async createVersion(
    @Param('id') id: string,
    @Body() dto: CreateModelVersionDto,
  ): Promise<ApiResponse<ModelResponseDto>> {
    const command = new CreateModelVersionCommand(id, dto);
    const result = await this.commandBus.execute<CreateModelVersionCommand, ModelResponseDto>(command);
    return this.success(result);
  }
}
