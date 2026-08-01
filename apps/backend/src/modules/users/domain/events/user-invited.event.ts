export class UserInvitedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly userId: string, public readonly organizationId: string, public readonly email: string) {}
}
