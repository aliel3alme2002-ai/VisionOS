import { Deployment } from '../entities/deployment';

export interface IDeploymentRepository {
  save(deployment: Deployment): Promise<void>;
  findById(id: string): Promise<Deployment | null>;
  findByRuntimeId(runtimeId: string): Promise<Deployment[]>;
}
