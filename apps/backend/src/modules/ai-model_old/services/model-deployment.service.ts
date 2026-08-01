import { Injectable, Inject } from '@nestjs/common';
import { ModelDeployment } from '../domain/model-deployment';
import { ModelDeploymentRepository, MODEL_DEPLOYMENT_REPOSITORY } from '../repositories/model-deployment.repository';
import { ModelRuntimeProvider, MODEL_RUNTIME_PROVIDER } from '../providers/model-runtime.provider';

@Injectable()
export class ModelDeploymentService {
  constructor(
    @Inject(MODEL_DEPLOYMENT_REPOSITORY) private readonly deploymentRepo: ModelDeploymentRepository,
    @Inject(MODEL_RUNTIME_PROVIDER) private readonly runtimeProvider: ModelRuntimeProvider
  ) {}

  async deploy(deployment: ModelDeployment): Promise<boolean> {
    await this.deploymentRepo.save(deployment);
    return this.runtimeProvider.configureRuntime(deployment.id, {
      engine: 'default',
      device: 'auto',
      batchSize: 1,
      threads: 4,
      optimization: 'none'
    });
  }

  async undeploy(deploymentId: string): Promise<boolean> {
    await this.deploymentRepo.delete(deploymentId);
    return this.runtimeProvider.stopRuntime(deploymentId);
  }
}
