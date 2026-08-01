import { DeploymentSlot } from '../domain/deployment-slot';

export interface DeploymentRepository {
  findById(id: string): Promise<DeploymentSlot | null>;
  findByEdge(edgeId: string): Promise<DeploymentSlot[]>;
  findByCamera(cameraId: string): Promise<DeploymentSlot[]>;
  save(slot: DeploymentSlot): Promise<void>;
  delete(id: string): Promise<void>;
}

export const DEPLOYMENT_REPOSITORY = Symbol('DEPLOYMENT_REPOSITORY');
