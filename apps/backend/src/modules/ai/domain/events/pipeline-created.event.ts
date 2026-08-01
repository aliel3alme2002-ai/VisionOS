export class PipelineCreatedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly pipelineId: string, public readonly organizationId: string, public readonly name: string) {}
}
