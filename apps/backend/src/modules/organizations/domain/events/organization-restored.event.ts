export class OrganizationRestoredEvent {
  public readonly occurredOn: Date = new Date();
  constructor(
    public readonly organizationId: string,
  ) {}
}
