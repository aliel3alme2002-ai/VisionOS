export enum RuntimeStatusEnum {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  INITIALIZING = 'INITIALIZING',
  DEGRADED = 'DEGRADED',
  ERROR = 'ERROR',
}

export class RuntimeStatus {
  constructor(private readonly value: RuntimeStatusEnum) {}

  public getValue(): RuntimeStatusEnum { return this.value; }
  public isOnline(): boolean { return this.value === RuntimeStatusEnum.ONLINE; }

  public static online(): RuntimeStatus { return new RuntimeStatus(RuntimeStatusEnum.ONLINE); }
  public static offline(): RuntimeStatus { return new RuntimeStatus(RuntimeStatusEnum.OFFLINE); }
  public static initializing(): RuntimeStatus { return new RuntimeStatus(RuntimeStatusEnum.INITIALIZING); }
  public static degraded(): RuntimeStatus { return new RuntimeStatus(RuntimeStatusEnum.DEGRADED); }
  public static error(): RuntimeStatus { return new RuntimeStatus(RuntimeStatusEnum.ERROR); }

  public static create(statusStr: string): RuntimeStatus {
    const uppercase = statusStr.toUpperCase() as RuntimeStatusEnum;
    if (!Object.values(RuntimeStatusEnum).includes(uppercase)) {
      throw new Error(`Invalid runtime status: ${statusStr}`);
    }
    return new RuntimeStatus(uppercase);
  }
}
