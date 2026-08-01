import { Controller, Post, Get, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { BaseController } from '../../api/common/controllers/base.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '../../application/common/dto/api-response';

import { CreateZoneDto } from '../dto/create-zone.dto';
import { ZoneResponseDto } from '../dto/zone-response.dto';
import { CreateLineDto } from '../dto/create-line.dto';
import { HeatmapResponseDto } from '../dto/heatmap-response.dto';
import { OccupancyResponseDto } from '../dto/occupancy-response.dto';

import { CreateZoneCommand } from '../application/commands/create-zone/create-zone.command';
import { CreateLineCommand } from '../application/commands/create-line/create-line.command';

import { GetZoneQuery } from '../application/queries/get-zone/get-zone.query';
import { ListZonesQuery } from '../application/queries/list-zones/list-zones.query';
import { GetHeatmapQuery } from '../application/queries/get-heatmap/get-heatmap.query';
import { GetOccupancyQuery } from '../application/queries/get-occupancy/get-occupancy.query';

@Controller('intelligence/zones')
export class ZonesController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateZoneDto): Promise<ApiResponse<ZoneResponseDto>> {
    const command = new CreateZoneCommand(dto);
    const result = await this.commandBus.execute<CreateZoneCommand, ZoneResponseDto>(command);
    return this.success(result);
  }

  @Get()
  async list(@Query('cameraId') cameraId: string): Promise<ApiResponse<ZoneResponseDto[]>> {
    const query = new ListZonesQuery(cameraId);
    const result = await this.queryBus.execute<ListZonesQuery, ZoneResponseDto[]>(query);
    return this.success(result);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ApiResponse<ZoneResponseDto>> {
    const query = new GetZoneQuery(id);
    const result = await this.queryBus.execute<GetZoneQuery, ZoneResponseDto>(query);
    return this.success(result);
  }

  @Post('lines')
  @HttpCode(HttpStatus.CREATED)
  async createLine(@Body() dto: CreateLineDto): Promise<ApiResponse<any>> {
    const command = new CreateLineCommand(dto);
    const result = await this.commandBus.execute<CreateLineCommand, any>(command);
    return this.success(result);
  }

  @Get('heatmap/:cameraId')
  async getHeatmap(@Param('cameraId') cameraId: string, @Query('range') range?: string): Promise<ApiResponse<HeatmapResponseDto>> {
    const query = new GetHeatmapQuery(cameraId, range ?? '24h');
    const result = await this.queryBus.execute<GetHeatmapQuery, HeatmapResponseDto>(query);
    return this.success(result);
  }

  @Get(':id/occupancy')
  async getOccupancy(@Param('id') id: string): Promise<ApiResponse<OccupancyResponseDto>> {
    const query = new GetOccupancyQuery(id);
    const result = await this.queryBus.execute<GetOccupancyQuery, OccupancyResponseDto>(query);
    return this.success(result);
  }
}
