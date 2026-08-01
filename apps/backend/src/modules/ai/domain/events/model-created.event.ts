export class ModelCreatedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly modelId: string, public readonly organizationId: string, public readonly name: string) {}
}
