export class PermissionDeletedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly permissionId: string) {}
}
