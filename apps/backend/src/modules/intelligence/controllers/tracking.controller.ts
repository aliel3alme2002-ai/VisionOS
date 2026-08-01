import { Controller, Get, Param } from '@nestjs/common';
import { BaseController } from '../../api/common/controllers/base.controller';
import { QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '../../application/common/dto/api-response';

import { TrackedObjectResponseDto } from '../dto/tracked-object-response.dto';
import { GetTrackedObjectQuery } from '../application/queries/get-tracked-object/get-tracked-object.query';
import { ListTrackedObjectsQuery } from '../application/queries/list-tracked-objects/list-tracked-objects.query';

@Controller('intelligence/tracking')
export class TrackingController extends BaseController {
  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  @Get('objects')
  async listActive(): Promise<ApiResponse<TrackedObjectResponseDto[]>> {
    const query = new ListTrackedObjectsQuery();
    const result = await this.queryBus.execute<ListTrackedObjectsQuery, TrackedObjectResponseDto[]>(query);
    return this.success(result);
  }

  @Get('objects/:trackingId')
  async getByTrackingId(@Param('trackingId') trackingId: string): Promise<ApiResponse<TrackedObjectResponseDto>> {
    const query = new GetTrackedObjectQuery(trackingId);
    const result = await this.queryBus.execute<GetTrackedObjectQuery, TrackedObjectResponseDto>(query);
    return this.success(result);
  }
}
