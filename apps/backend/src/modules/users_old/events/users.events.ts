export class UserCreated {
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly timestamp: Date,
  ) {}
}

export class UserUpdated {
  constructor(
    public readonly userId: string,
    public readonly timestamp: Date,
  ) {}
}

export class ProfileUpdated {
  constructor(
    public readonly userId: string,
    public readonly timestamp: Date,
  ) {}
}

export class InvitationCreated {
  constructor(
    public readonly invitationId: string,
    public readonly organizationId: string,
    public readonly email: string,
    public readonly timestamp: Date,
  ) {}
}

export class InvitationAccepted {
  constructor(
    public readonly invitationId: string,
    public readonly userId: string,
    public readonly organizationId: string,
    public readonly timestamp: Date,
  ) {}
}

export class InvitationExpired {
  constructor(
    public readonly invitationId: string,
    public readonly timestamp: Date,
  ) {}
}
