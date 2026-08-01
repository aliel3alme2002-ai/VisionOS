import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListCameraGroupsQuery } from './list-camera-groups.query';
import { CameraGroupResponseDto } from '../../../dto/camera-group.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { ICameraGroupRepository } from '../../../domain/repositories/camera-group.repository';

@QueryHandler(ListCameraGroupsQuery)
export class ListCameraGroupsHandler implements BaseQueryHandler<ListCameraGroupsQuery, CameraGroupResponseDto[]>, IQueryHandler<ListCameraGroupsQuery> {
  constructor(@Inject('ICameraGroupRepository') private readonly repository: ICameraGroupRepository) {}

  async execute(query: ListCameraGroupsQuery): Promise<CameraGroupResponseDto[]> {
    const groups = await this.repository.findByOrgId(query.organizationId);
    return groups.map((g) => CameraGroupResponseDto.fromEntity(g));
  }
}
