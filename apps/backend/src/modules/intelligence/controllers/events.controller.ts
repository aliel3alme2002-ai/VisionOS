import { Controller, Get, Param, Query } from '@nestjs/common';
import { BaseController } from '../../api/common/controllers/base.controller';
import { QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '../../application/common/dto/api-response';

import { EventResponseDto } from '../dto/event-response.dto';
import { GetEventQuery } from '../application/queries/get-event/get-event.query';
import { ListEventsQuery } from '../application/queries/list-events/list-events.query';

@Controller('intelligence/events')
export class EventsController extends BaseController {
  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  @Get()
  async list(@Query('cameraId') cameraId: string): Promise<ApiResponse<EventResponseDto[]>> {
    const query = new ListEventsQuery(cameraId);
    const result = await this.queryBus.execute<ListEventsQuery, EventResponseDto[]>(query);
    return this.success(result);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ApiResponse<EventResponseDto>> {
    const query = new GetEventQuery(id);
    const result = await this.queryBus.execute<GetEventQuery, EventResponseDto>(query);
    return this.success(result);
  }
}
