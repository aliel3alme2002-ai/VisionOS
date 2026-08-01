import { Controller, Get, Param } from '@nestjs/common';
import { BaseController } from '../../api/common/controllers/base.controller';
import { QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '../../application/common/dto/api-response';

import { GetCameraHealthQuery } from '../application/queries/get-camera-health/get-camera-health.query';
import { GetEdgeHealthQuery } from '../application/queries/get-edge-health/get-edge-health.query';

@Controller('vision/health')
export class HealthController extends BaseController {
  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  @Get('cameras/:id')
  async getCameraHealth(@Param('id') id: string): Promise<ApiResponse<any>> {
    const query = new GetCameraHealthQuery(id);
    const result = await this.queryBus.execute<GetCameraHealthQuery, any>(query);
    return this.success(result);
  }

  @Get('edge/:id')
  async getEdgeHealth(@Param('id') id: string): Promise<ApiResponse<any>> {
    const query = new GetEdgeHealthQuery(id);
    const result = await this.queryBus.execute<GetEdgeHealthQuery, any>(query);
    return this.success(result);
  }
}
