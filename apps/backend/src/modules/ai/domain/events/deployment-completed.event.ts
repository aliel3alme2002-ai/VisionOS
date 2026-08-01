export class DeploymentCompletedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly deploymentId: string) {}
}
