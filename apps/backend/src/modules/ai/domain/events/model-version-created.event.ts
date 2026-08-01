export class ModelVersionCreatedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly modelId: string, public readonly version: string) {}
}
