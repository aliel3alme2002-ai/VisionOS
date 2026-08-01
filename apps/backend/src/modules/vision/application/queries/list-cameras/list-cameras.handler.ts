import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListCamerasQuery } from './list-cameras.query';
import { CameraResponseDto } from '../../../dto/camera-response.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { ICameraRepository } from '../../../domain/repositories/camera.repository';

@QueryHandler(ListCamerasQuery)
export class ListCamerasHandler implements BaseQueryHandler<ListCamerasQuery, CameraResponseDto[]>, IQueryHandler<ListCamerasQuery> {
  constructor(@Inject('ICameraRepository') private readonly repository: ICameraRepository) {}

  async execute(query: ListCamerasQuery): Promise<CameraResponseDto[]> {
    const cams = await this.repository.findByOrgId(query.organizationId, query.includeDeleted);
    return cams.map((c) => CameraResponseDto.fromEntity(c));
  }
}
