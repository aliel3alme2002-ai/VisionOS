import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDetectionQuery } from './get-detection.query';
import { DetectionResponseDto } from '../../../dto/detection-response.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { IDetectionRepository } from '../../../domain/repositories/detection.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@QueryHandler(GetDetectionQuery)
export class GetDetectionHandler implements BaseQueryHandler<GetDetectionQuery, DetectionResponseDto>, IQueryHandler<GetDetectionQuery> {
  constructor(@Inject('IDetectionRepository') private readonly repository: IDetectionRepository) {}

  async execute(query: GetDetectionQuery): Promise<DetectionResponseDto> {
    const det = await this.repository.findById(query.id);
    if (!det) throw new NotFoundException(`Detection '${query.id}' not found.`);
    return DetectionResponseDto.fromEntity(det);
  }
}
