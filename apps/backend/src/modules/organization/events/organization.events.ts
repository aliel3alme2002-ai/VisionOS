export class OrganizationCreated {
  constructor(
    public readonly organizationId: string,
    public readonly name: string,
    public readonly timestamp: Date,
  ) {}
}

export class OrganizationUpdated {
  constructor(
    public readonly organizationId: string,
    public readonly timestamp: Date,
  ) {}
}

export class HotelCreated {
  constructor(
    public readonly hotelId: string,
    public readonly organizationId: string,
    public readonly timestamp: Date,
  ) {}
}

export class DepartmentCreated {
  constructor(
    public readonly departmentId: string,
    public readonly organizationId: string,
    public readonly timestamp: Date,
  ) {}
}

export class MembershipAdded {
  constructor(
    public readonly membershipId: string,
    public readonly userId: string,
    public readonly organizationId: string,
    public readonly timestamp: Date,
  ) {}
}

export class MembershipRemoved {
  constructor(
    public readonly membershipId: string,
    public readonly userId: string,
    public readonly organizationId: string,
    public readonly timestamp: Date,
  ) {}
}

export class MembershipContextChanged {
  constructor(
    public readonly membershipId: string,
    public readonly userId: string,
    public readonly organizationId: string,
    public readonly newHotelId: string | undefined,
    public readonly timestamp: Date,
  ) {}
}
