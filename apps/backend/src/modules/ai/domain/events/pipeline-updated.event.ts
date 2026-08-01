export class PipelineUpdatedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly pipelineId: string) {}
}
