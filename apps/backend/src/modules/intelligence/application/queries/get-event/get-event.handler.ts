import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetEventQuery } from './get-event.query';
import { EventResponseDto } from '../../../dto/event-response.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { IEventRepository } from '../../../domain/repositories/event.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@QueryHandler(GetEventQuery)
export class GetEventHandler implements BaseQueryHandler<GetEventQuery, EventResponseDto>, IQueryHandler<GetEventQuery> {
  constructor(@Inject('IEventRepository') private readonly repository: IEventRepository) {}

  async execute(query: GetEventQuery): Promise<EventResponseDto> {
    const ev = await this.repository.findById(query.id);
    if (!ev) throw new NotFoundException(`Event '${query.id}' not found.`);
    return EventResponseDto.fromEntity(ev);
  }
}
