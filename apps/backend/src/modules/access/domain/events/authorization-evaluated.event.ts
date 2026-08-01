export class AuthorizationEvaluatedEvent {
  public readonly occurredOn: Date = new Date();
  constructor(
    public readonly userId: string,
    public readonly permission: string,
    public readonly allowed: boolean,
    public readonly reason?: string,
  ) {}
}
