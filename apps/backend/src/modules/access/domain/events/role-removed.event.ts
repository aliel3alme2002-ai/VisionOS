export class RoleRemovedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly userId: string, public readonly roleId: string, public readonly organizationId: string) {}
}
