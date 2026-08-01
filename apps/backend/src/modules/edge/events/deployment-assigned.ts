import { DeploymentSlot } from '../domain/deployment-slot';

export class DeploymentAssignedEvent {
  constructor(
    public readonly deployment: DeploymentSlot,
    public readonly timestamp: Date = new Date()
  ) {}
}
