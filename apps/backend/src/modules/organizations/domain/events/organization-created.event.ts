export class OrganizationCreatedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(
    public readonly organizationId: string,
    public readonly name: string,
    public readonly slug: string,
    public readonly ownerId: string,
  ) {}
}
