export enum UserStatusEnum {
  ACTIVE = 'ACTIVE',
  INVITED = 'INVITED',
  DISABLED = 'DISABLED',
  LOCKED = 'LOCKED',
  DELETED = 'DELETED',
}

export class UserStatus {
  constructor(private readonly value: UserStatusEnum) {}

  public getValue(): UserStatusEnum {
    return this.value;
  }

  public isActive(): boolean { return this.value === UserStatusEnum.ACTIVE; }
  public isInvited(): boolean { return this.value === UserStatusEnum.INVITED; }
  public isDisabled(): boolean { return this.value === UserStatusEnum.DISABLED; }
  public isLocked(): boolean { return this.value === UserStatusEnum.LOCKED; }
  public isDeleted(): boolean { return this.value === UserStatusEnum.DELETED; }

  public static active(): UserStatus { return new UserStatus(UserStatusEnum.ACTIVE); }
  public static invited(): UserStatus { return new UserStatus(UserStatusEnum.INVITED); }
  public static disabled(): UserStatus { return new UserStatus(UserStatusEnum.DISABLED); }
  public static locked(): UserStatus { return new UserStatus(UserStatusEnum.LOCKED); }
  public static deleted(): UserStatus { return new UserStatus(UserStatusEnum.DELETED); }

  public static create(status: string): UserStatus {
    const uppercase = status.toUpperCase() as UserStatusEnum;
    if (!Object.values(UserStatusEnum).includes(uppercase)) {
      throw new Error(`Invalid user status: ${status}`);
    }
    return new UserStatus(uppercase);
  }
}
