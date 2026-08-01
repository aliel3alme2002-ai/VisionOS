import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetCameraGroupQuery } from './get-camera-group.query';
import { CameraGroupResponseDto } from '../../../dto/camera-group.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { ICameraGroupRepository } from '../../../domain/repositories/camera-group.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@QueryHandler(GetCameraGroupQuery)
export class GetCameraGroupHandler implements BaseQueryHandler<GetCameraGroupQuery, CameraGroupResponseDto>, IQueryHandler<GetCameraGroupQuery> {
  constructor(@Inject('ICameraGroupRepository') private readonly repository: ICameraGroupRepository) {}

  async execute(query: GetCameraGroupQuery): Promise<CameraGroupResponseDto> {
    const g = await this.repository.findById(query.id);
    if (!g) throw new NotFoundException(`Camera Group '${query.id}' not found.`);
    return CameraGroupResponseDto.fromEntity(g);
  }
}
