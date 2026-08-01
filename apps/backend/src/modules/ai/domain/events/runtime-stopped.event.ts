export class RuntimeStoppedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly runtimeId: string) {}
}
