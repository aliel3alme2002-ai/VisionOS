export class ModelUpdatedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly modelId: string, public readonly name: string) {}
}
