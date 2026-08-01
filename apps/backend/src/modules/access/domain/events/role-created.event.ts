export class RoleCreatedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly roleId: string, public readonly name: string, public readonly organizationId: string | null) {}
}
