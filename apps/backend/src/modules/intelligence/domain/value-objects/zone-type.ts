export enum ZoneTypeEnum {
  DETECTION = 'Detection',
  RESTRICTED = 'Restricted',
  DANGER = 'Danger',
  PARKING = 'Parking',
  POOL = 'Pool',
  FIRE_EXIT = 'Fire Exit',
  QUEUE = 'Queue',
  CUSTOM = 'Custom',
}

export class ZoneType {
  constructor(private readonly value: ZoneTypeEnum) {}

  public getValue(): ZoneTypeEnum { return this.value; }

  public static detection(): ZoneType { return new ZoneType(ZoneTypeEnum.DETECTION); }
  public static restricted(): ZoneType { return new ZoneType(ZoneTypeEnum.RESTRICTED); }
  public static danger(): ZoneType { return new ZoneType(ZoneTypeEnum.DANGER); }

  public static create(typeStr: string): ZoneType {
    const matched = Object.values(ZoneTypeEnum).find((v) => v.toLowerCase() === typeStr.toLowerCase());
    if (!matched) {
      throw new Error(`Invalid zone type: ${typeStr}`);
    }
    return new ZoneType(matched);
  }
}
