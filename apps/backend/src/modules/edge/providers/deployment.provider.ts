import { DeploymentSlot } from '../domain/deployment-slot';

export interface DeploymentProvider {
  deploy(slot: DeploymentSlot): Promise<boolean>;
  remove(slotId: string): Promise<boolean>;
  getStatus(slotId: string): Promise<string>;
}

export const DEPLOYMENT_PROVIDER = Symbol('DEPLOYMENT_PROVIDER');
