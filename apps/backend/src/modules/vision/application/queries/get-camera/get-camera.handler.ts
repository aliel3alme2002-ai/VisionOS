import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetCameraQuery } from './get-camera.query';
import { CameraResponseDto } from '../../../dto/camera-response.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { ICameraRepository } from '../../../domain/repositories/camera.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@QueryHandler(GetCameraQuery)
export class GetCameraHandler implements BaseQueryHandler<GetCameraQuery, CameraResponseDto>, IQueryHandler<GetCameraQuery> {
  constructor(@Inject('ICameraRepository') private readonly repository: ICameraRepository) {}

  async execute(query: GetCameraQuery): Promise<CameraResponseDto> {
    const cam = await this.repository.findById(query.id);
    if (!cam) throw new NotFoundException(`Camera '${query.id}' not found.`);
    return CameraResponseDto.fromEntity(cam);
  }
}
