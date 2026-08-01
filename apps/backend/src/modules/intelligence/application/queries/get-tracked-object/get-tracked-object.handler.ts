import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetTrackedObjectQuery } from './get-tracked-object.query';
import { TrackedObjectResponseDto } from '../../../dto/tracked-object-response.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { ITrackedObjectRepository } from '../../../domain/repositories/tracked-object.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@QueryHandler(GetTrackedObjectQuery)
export class GetTrackedObjectHandler implements BaseQueryHandler<GetTrackedObjectQuery, TrackedObjectResponseDto>, IQueryHandler<GetTrackedObjectQuery> {
  constructor(@Inject('ITrackedObjectRepository') private readonly repository: ITrackedObjectRepository) {}

  async execute(query: GetTrackedObjectQuery): Promise<TrackedObjectResponseDto> {
    const obj = await this.repository.findByTrackingId(query.trackingId);
    if (!obj) throw new NotFoundException(`Tracked object '${query.trackingId}' not found.`);
    return TrackedObjectResponseDto.fromEntity(obj);
  }
}
