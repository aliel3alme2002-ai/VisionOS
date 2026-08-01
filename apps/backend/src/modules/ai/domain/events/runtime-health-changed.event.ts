export class RuntimeHealthChangedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly runtimeId: string, public readonly status: string) {}
}
