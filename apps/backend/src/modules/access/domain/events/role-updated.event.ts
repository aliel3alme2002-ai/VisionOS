export class RoleUpdatedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly roleId: string, public readonly name: string) {}
}
