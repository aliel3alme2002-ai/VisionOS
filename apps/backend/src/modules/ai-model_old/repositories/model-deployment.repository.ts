import { ModelDeployment } from '../domain/model-deployment';

export interface ModelDeploymentRepository {
  findById(id: string): Promise<ModelDeployment | null>;
  findByEdge(edgeId: string): Promise<ModelDeployment[]>;
  save(deployment: ModelDeployment): Promise<void>;
  delete(id: string): Promise<void>;
}

export const MODEL_DEPLOYMENT_REPOSITORY = Symbol('MODEL_DEPLOYMENT_REPOSITORY');
