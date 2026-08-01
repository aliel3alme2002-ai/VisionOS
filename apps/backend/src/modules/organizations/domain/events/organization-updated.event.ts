export class OrganizationUpdatedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(
    public readonly organizationId: string,
    public readonly name: string,
  ) {}
}
