import { Injectable, Inject } from '@nestjs/common';
import { IRuntimeRepository } from '../repositories/runtime.repository';
import { GpuDevice } from '../entities/gpu-device';

@Injectable()
export class GpuAllocationService {
  constructor(
    @Inject('IRuntimeRepository') private readonly runtimeRepository: IRuntimeRepository,
  ) {}

  public async getAvailableGpus(runtimeId: string): Promise<GpuDevice[]> {
    const runtime = await this.runtimeRepository.findById(runtimeId);
    if (!runtime) return [];
    return runtime.gpuDevices.filter((g) => g.utilization < 90);
  }
}
