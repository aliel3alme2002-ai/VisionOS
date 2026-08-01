import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListTrackedObjectsQuery } from './list-tracked-objects.query';
import { TrackedObjectResponseDto } from '../../../dto/tracked-object-response.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { ITrackedObjectRepository } from '../../../domain/repositories/tracked-object.repository';

@QueryHandler(ListTrackedObjectsQuery)
export class ListTrackedObjectsHandler implements BaseQueryHandler<ListTrackedObjectsQuery, TrackedObjectResponseDto[]>, IQueryHandler<ListTrackedObjectsQuery> {
  constructor(@Inject('ITrackedObjectRepository') private readonly repository: ITrackedObjectRepository) {}

  async execute(_query: ListTrackedObjectsQuery): Promise<TrackedObjectResponseDto[]> {
    const list = await this.repository.findAllActive();
    return list.map((o) => TrackedObjectResponseDto.fromEntity(o));
  }
}
