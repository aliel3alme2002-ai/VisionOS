import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetCameraHealthQuery } from './get-camera-health.query';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { VisionHealthService } from '../../../domain/services/vision-health.service';

@QueryHandler(GetCameraHealthQuery)
export class GetCameraHealthHandler implements BaseQueryHandler<GetCameraHealthQuery, any>, IQueryHandler<GetCameraHealthQuery> {
  constructor(private readonly healthService: VisionHealthService) {}

  async execute(query: GetCameraHealthQuery): Promise<any> {
    return this.healthService.checkCameraHealth(query.cameraId);
  }
}
