import { Controller, Post, Get, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { BaseController } from '../../api/common/controllers/base.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '../../application/common/dto/api-response';

import { CreateDeploymentDto } from '../dto/create-deployment.dto';
import { DeploymentResponseDto } from '../dto/deployment-response.dto';

import { CreateDeploymentCommand } from '../application/commands/create-deployment/create-deployment.command';
import { RollbackDeploymentCommand } from '../application/commands/rollback-deployment/rollback-deployment.command';
import { GetDeploymentQuery } from '../application/queries/get-deployment/get-deployment.query';

@Controller('ai/deployments')
export class DeploymentsController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateDeploymentDto): Promise<ApiResponse<DeploymentResponseDto>> {
    const command = new CreateDeploymentCommand(dto);
    const result = await this.commandBus.execute<CreateDeploymentCommand, DeploymentResponseDto>(command);
    return this.success(result);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ApiResponse<DeploymentResponseDto>> {
    const query = new GetDeploymentQuery(id);
    const result = await this.queryBus.execute<GetDeploymentQuery, DeploymentResponseDto>(query);
    return this.success(result);
  }

  @Post(':id/rollback')
  @HttpCode(HttpStatus.OK)
  async rollback(@Param('id') id: string): Promise<ApiResponse<DeploymentResponseDto>> {
    const command = new RollbackDeploymentCommand(id);
    const result = await this.commandBus.execute<RollbackDeploymentCommand, DeploymentResponseDto>(command);
    return this.success(result);
  }
}
