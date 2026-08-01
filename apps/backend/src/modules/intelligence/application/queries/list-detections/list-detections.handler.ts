import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListDetectionsQuery } from './list-detections.query';
import { DetectionResponseDto } from '../../../dto/detection-response.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { IDetectionRepository } from '../../../domain/repositories/detection.repository';

@QueryHandler(ListDetectionsQuery)
export class ListDetectionsHandler implements BaseQueryHandler<ListDetectionsQuery, DetectionResponseDto[]>, IQueryHandler<ListDetectionsQuery> {
  constructor(@Inject('IDetectionRepository') private readonly repository: IDetectionRepository) {}

  async execute(query: ListDetectionsQuery): Promise<DetectionResponseDto[]> {
    const list = await this.repository.findByCameraId(query.cameraId);
    return list.map((d) => DetectionResponseDto.fromEntity(d));
  }
}
