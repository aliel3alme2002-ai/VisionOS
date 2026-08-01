import { Injectable, Inject } from '@nestjs/common';
import { DeploymentSlot } from '../domain/deployment-slot';
import { DeploymentRepository, DEPLOYMENT_REPOSITORY } from '../repositories/deployment.repository';
import { DeploymentProvider, DEPLOYMENT_PROVIDER } from '../providers/deployment.provider';

@Injectable()
export class EdgeAssignmentService {
  constructor(
    @Inject(DEPLOYMENT_REPOSITORY) private readonly deploymentRepo: DeploymentRepository,
    @Inject(DEPLOYMENT_PROVIDER) private readonly deploymentProvider: DeploymentProvider
  ) {}

  async assignCameraModel(slot: DeploymentSlot): Promise<boolean> {
    await this.deploymentRepo.save(slot);
    return this.deploymentProvider.deploy(slot);
  }

  async removeCameraModel(slotId: string): Promise<boolean> {
    await this.deploymentRepo.delete(slotId);
    return this.deploymentProvider.remove(slotId);
  }
}
