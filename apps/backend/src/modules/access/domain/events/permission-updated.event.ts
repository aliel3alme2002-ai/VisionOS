export class PermissionUpdatedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly permissionId: string) {}
}
