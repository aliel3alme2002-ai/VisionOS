export class PermissionCreatedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly permissionId: string, public readonly resource: string, public readonly action: string) {}
}
