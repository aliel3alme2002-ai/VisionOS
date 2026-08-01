export class RoleRestoredEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly roleId: string) {}
}
