export class DeploymentRemovedEvent {
  constructor(
    public readonly deploymentId: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
