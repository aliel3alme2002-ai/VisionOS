export class DeploymentRolledBackEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly deploymentId: string) {}
}
