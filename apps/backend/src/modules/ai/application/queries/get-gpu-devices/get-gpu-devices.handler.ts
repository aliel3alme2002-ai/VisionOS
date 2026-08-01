import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetGpuDevicesQuery } from './get-gpu-devices.query';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { GpuAllocationService } from '../../../domain/services/gpu-allocation.service';
import { GpuDevice } from '../../../domain/entities/gpu-device';

@QueryHandler(GetGpuDevicesQuery)
export class GetGpuDevicesHandler implements BaseQueryHandler<GetGpuDevicesQuery, GpuDevice[]>, IQueryHandler<GetGpuDevicesQuery> {
  constructor(private readonly gpuService: GpuAllocationService) {}

  async execute(query: GetGpuDevicesQuery): Promise<GpuDevice[]> {
    return this.gpuService.getAvailableGpus(query.runtimeId);
  }
}
