import { Injectable, Inject } from '@nestjs/common';
import { IDeploymentRepository } from '../repositories/deployment.repository';
import { IRuntimeRepository } from '../repositories/runtime.repository';

@Injectable()
export class AiDeploymentService {
  constructor(
    @Inject('IDeploymentRepository') private readonly deploymentRepository: IDeploymentRepository,
    @Inject('IRuntimeRepository') private readonly runtimeRepository: IRuntimeRepository,
  ) {}

  public async validateDeploymentSlot(runtimeId: string, slotId: string): Promise<boolean> {
    const runtime = await this.runtimeRepository.findById(runtimeId);
    if (!runtime) throw new Error(`Runtime '${runtimeId}' not found`);
    const existing = await this.deploymentRepository.findByRuntimeId(runtimeId);
    return !existing.some((d) => d.deploymentSlotId === slotId && d.status.isActive());
  }
}
