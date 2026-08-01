export class RoleCreated {
  constructor(
    public readonly roleId: string,
    public readonly tenantId: string | null,
    public readonly name: string,
    public readonly timestamp: Date,
  ) {}
}

export class RoleUpdated {
  constructor(
    public readonly roleId: string,
    public readonly tenantId: string | null,
    public readonly name: string,
    public readonly timestamp: Date,
  ) {}
}

export class RoleDeleted {
  constructor(
    public readonly roleId: string,
    public readonly tenantId: string | null,
    public readonly timestamp: Date,
  ) {}
}

export class PermissionAssigned {
  constructor(
    public readonly roleId: string,
    public readonly permissionId: string,
    public readonly tenantId: string | null,
    public readonly timestamp: Date,
  ) {}
}

export class PermissionRemoved {
  constructor(
    public readonly roleId: string,
    public readonly permissionId: string,
    public readonly tenantId: string | null,
    public readonly timestamp: Date,
  ) {}
}

export class UserRoleAssigned {
  constructor(
    public readonly userId: string,
    public readonly roleId: string,
    public readonly tenantId: string | null,
    public readonly timestamp: Date,
  ) {}
}

export class UserRoleRemoved {
  constructor(
    public readonly userId: string,
    public readonly roleId: string,
    public readonly tenantId: string | null,
    public readonly timestamp: Date,
  ) {}
}
