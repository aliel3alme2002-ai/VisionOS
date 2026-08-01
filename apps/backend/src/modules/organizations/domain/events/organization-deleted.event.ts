export class OrganizationDeletedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(
    public readonly organizationId: string,
    public readonly deletedAt: Date,
  ) {}
}
