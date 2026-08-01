import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListEventsQuery } from './list-events.query';
import { EventResponseDto } from '../../../dto/event-response.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { IEventRepository } from '../../../domain/repositories/event.repository';

@QueryHandler(ListEventsQuery)
export class ListEventsHandler implements BaseQueryHandler<ListEventsQuery, EventResponseDto[]>, IQueryHandler<ListEventsQuery> {
  constructor(@Inject('IEventRepository') private readonly repository: IEventRepository) {}

  async execute(query: ListEventsQuery): Promise<EventResponseDto[]> {
    const list = await this.repository.findByCameraId(query.cameraId);
    return list.map((e) => EventResponseDto.fromEntity(e));
  }
}
