export enum PermissionScopeEnum {
  ANY = 'ANY',
  ORGANIZATION = 'ORGANIZATION',
  ASSIGNED = 'ASSIGNED',
  SELF = 'SELF',
}

export class PermissionScope {
  constructor(private readonly value: PermissionScopeEnum) {}

  public getValue(): PermissionScopeEnum {
    return this.value;
  }

  public isAny(): boolean { return this.value === PermissionScopeEnum.ANY; }
  public isOrganization(): boolean { return this.value === PermissionScopeEnum.ORGANIZATION; }
  public isAssigned(): boolean { return this.value === PermissionScopeEnum.ASSIGNED; }
  public isSelf(): boolean { return this.value === PermissionScopeEnum.SELF; }

  public static any(): PermissionScope { return new PermissionScope(PermissionScopeEnum.ANY); }
  public static organization(): PermissionScope { return new PermissionScope(PermissionScopeEnum.ORGANIZATION); }
  public static assigned(): PermissionScope { return new PermissionScope(PermissionScopeEnum.ASSIGNED); }
  public static self(): PermissionScope { return new PermissionScope(PermissionScopeEnum.SELF); }

  public static create(scopeStr: string): PermissionScope {
    const uppercase = scopeStr.toUpperCase() as PermissionScopeEnum;
    if (!Object.values(PermissionScopeEnum).includes(uppercase)) {
      throw new Error(`Invalid permission scope: ${scopeStr}`);
    }
    return new PermissionScope(uppercase);
  }
}
