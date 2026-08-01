export class UserRestoredEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly userId: string, public readonly organizationId: string) {}
}
