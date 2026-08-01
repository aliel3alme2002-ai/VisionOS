import { Controller, Post, Get, Put, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { BaseController } from '../../api/common/controllers/base.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '../../application/common/dto/api-response';

import { RegisterEdgeNodeDto, EdgeNodeResponseDto } from '../dto/edge-node.dto';
import { EdgeHeartbeatDto } from '../dto/edge-heartbeat.dto';

import { RegisterEdgeNodeCommand } from '../application/commands/register-edge-node/register-edge-node.command';
import { UpdateEdgeNodeCommand } from '../application/commands/update-edge-node/update-edge-node.command';
import { EdgeHeartbeatCommand } from '../application/commands/edge-heartbeat/edge-heartbeat.command';
import { AssignDeploymentSlotCommand } from '../application/commands/assign-deployment-slot/assign-deployment-slot.command';

import { GetEdgeNodeQuery } from '../application/queries/get-edge-node/get-edge-node.query';
import { ListEdgeNodesQuery } from '../application/queries/list-edge-nodes/list-edge-nodes.query';

@Controller('vision/edge')
export class EdgeController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterEdgeNodeDto): Promise<ApiResponse<EdgeNodeResponseDto>> {
    const command = new RegisterEdgeNodeCommand(dto);
    const result = await this.commandBus.execute<RegisterEdgeNodeCommand, EdgeNodeResponseDto>(command);
    return this.success(result);
  }

  @Get()
  async list(
    @Query('organizationId') organizationId: string,
    @Query('includeDeleted') includeDeleted?: string,
  ): Promise<ApiResponse<EdgeNodeResponseDto[]>> {
    const query = new ListEdgeNodesQuery(organizationId, includeDeleted === 'true');
    const result = await this.queryBus.execute<ListEdgeNodesQuery, EdgeNodeResponseDto[]>(query);
    return this.success(result);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ApiResponse<EdgeNodeResponseDto>> {
    const query = new GetEdgeNodeQuery(id);
    const result = await this.queryBus.execute<GetEdgeNodeQuery, EdgeNodeResponseDto>(query);
    return this.success(result);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: { name?: string }): Promise<ApiResponse<EdgeNodeResponseDto>> {
    const command = new UpdateEdgeNodeCommand(id, body.name);
    const result = await this.commandBus.execute<UpdateEdgeNodeCommand, EdgeNodeResponseDto>(command);
    return this.success(result);
  }

  @Post('heartbeat')
  @HttpCode(HttpStatus.OK)
  async heartbeat(@Body() dto: EdgeHeartbeatDto): Promise<void> {
    const command = new EdgeHeartbeatCommand(dto.edgeNodeId);
    await this.commandBus.execute(command);
  }

  @Post(':id/deployment-slots')
  @HttpCode(HttpStatus.CREATED)
  async assignSlot(
    @Param('id') id: string,
    @Body() body: { slotNumber: number; runtime: string },
  ): Promise<void> {
    const command = new AssignDeploymentSlotCommand(id, body.slotNumber, body.runtime);
    await this.commandBus.execute(command);
  }
}
