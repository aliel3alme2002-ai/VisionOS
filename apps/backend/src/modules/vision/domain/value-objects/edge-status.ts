export enum EdgeStatusEnum {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  UPDATING = 'UPDATING',
  ERROR = 'ERROR',
  MAINTENANCE = 'MAINTENANCE',
}

export class EdgeStatus {
  constructor(private readonly value: EdgeStatusEnum) {}

  public getValue(): EdgeStatusEnum { return this.value; }
  public isOnline(): boolean { return this.value === EdgeStatusEnum.ONLINE; }
  public isOffline(): boolean { return this.value === EdgeStatusEnum.OFFLINE; }

  public static online(): EdgeStatus { return new EdgeStatus(EdgeStatusEnum.ONLINE); }
  public static offline(): EdgeStatus { return new EdgeStatus(EdgeStatusEnum.OFFLINE); }
  public static updating(): EdgeStatus { return new EdgeStatus(EdgeStatusEnum.UPDATING); }
  public static error(): EdgeStatus { return new EdgeStatus(EdgeStatusEnum.ERROR); }
  public static maintenance(): EdgeStatus { return new EdgeStatus(EdgeStatusEnum.MAINTENANCE); }

  public static create(statusStr: string): EdgeStatus {
    const uppercase = statusStr.toUpperCase() as EdgeStatusEnum;
    if (!Object.values(EdgeStatusEnum).includes(uppercase)) {
      throw new Error(`Invalid edge status: ${statusStr}`);
    }
    return new EdgeStatus(uppercase);
  }
}
