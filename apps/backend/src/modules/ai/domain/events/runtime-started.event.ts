export class RuntimeStartedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly runtimeId: string, public readonly type: string) {}
}
