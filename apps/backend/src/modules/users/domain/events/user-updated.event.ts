export class UserUpdatedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly userId: string, public readonly organizationId: string) {}
}
