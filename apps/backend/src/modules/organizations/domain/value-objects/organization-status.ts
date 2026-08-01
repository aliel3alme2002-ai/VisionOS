export enum OrganizationStatusEnum {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  ARCHIVED = 'ARCHIVED',
  DELETED = 'DELETED',
}

export class OrganizationStatus {
  constructor(private readonly value: OrganizationStatusEnum) {}

  public getValue(): OrganizationStatusEnum {
    return this.value;
  }

  public isActive(): boolean {
    return this.value === OrganizationStatusEnum.ACTIVE;
  }

  public isDeleted(): boolean {
    return this.value === OrganizationStatusEnum.DELETED;
  }

  public static active(): OrganizationStatus {
    return new OrganizationStatus(OrganizationStatusEnum.ACTIVE);
  }

  public static deleted(): OrganizationStatus {
    return new OrganizationStatus(OrganizationStatusEnum.DELETED);
  }

  public static create(status: string): OrganizationStatus {
    const uppercaseStatus = status.toUpperCase() as OrganizationStatusEnum;
    if (!Object.values(OrganizationStatusEnum).includes(uppercaseStatus)) {
      throw new Error(`Invalid organization status: ${status}`);
    }
    return new OrganizationStatus(uppercaseStatus);
  }
}
