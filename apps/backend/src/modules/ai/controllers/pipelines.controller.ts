import { Controller, Post, Get, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { BaseController } from '../../api/common/controllers/base.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '../../application/common/dto/api-response';

import { CreatePipelineDto } from '../dto/create-pipeline.dto';
import { PipelineResponseDto } from '../dto/pipeline-response.dto';

import { CreatePipelineCommand } from '../application/commands/create-pipeline/create-pipeline.command';
import { GetPipelineQuery } from '../application/queries/get-pipeline/get-pipeline.query';

@Controller('ai/pipelines')
export class PipelinesController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreatePipelineDto): Promise<ApiResponse<PipelineResponseDto>> {
    const command = new CreatePipelineCommand(dto);
    const result = await this.commandBus.execute<CreatePipelineCommand, PipelineResponseDto>(command);
    return this.success(result);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ApiResponse<PipelineResponseDto>> {
    const query = new GetPipelineQuery(id);
    const result = await this.queryBus.execute<GetPipelineQuery, PipelineResponseDto>(query);
    return this.success(result);
  }
}
