export class DeploymentStartedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly deploymentId: string, public readonly modelVersionId: string, public readonly strategy: string) {}
}
