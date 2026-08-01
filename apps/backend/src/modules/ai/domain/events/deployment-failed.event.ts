export class DeploymentFailedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly deploymentId: string, public readonly reason: string) {}
}
