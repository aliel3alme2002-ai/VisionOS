export enum CameraStatusEnum {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  MAINTENANCE = 'MAINTENANCE',
}

export class CameraStatus {
  constructor(private readonly value: CameraStatusEnum) {}

  public getValue(): CameraStatusEnum { return this.value; }
  public isOnline(): boolean { return this.value === CameraStatusEnum.ONLINE; }
  public isOffline(): boolean { return this.value === CameraStatusEnum.OFFLINE; }

  public static online(): CameraStatus { return new CameraStatus(CameraStatusEnum.ONLINE); }
  public static offline(): CameraStatus { return new CameraStatus(CameraStatusEnum.OFFLINE); }
  public static warning(): CameraStatus { return new CameraStatus(CameraStatusEnum.WARNING); }
  public static error(): CameraStatus { return new CameraStatus(CameraStatusEnum.ERROR); }
  public static maintenance(): CameraStatus { return new CameraStatus(CameraStatusEnum.MAINTENANCE); }

  public static create(statusStr: string): CameraStatus {
    const uppercase = statusStr.toUpperCase() as CameraStatusEnum;
    if (!Object.values(CameraStatusEnum).includes(uppercase)) {
      throw new Error(`Invalid camera status: ${statusStr}`);
    }
    return new CameraStatus(uppercase);
  }
}
