export interface OccupancyProps {
  id: string;
  zoneId: string;
  currentCount: number;
  maxCapacity?: number;
  updatedAt?: Date;
}

export class Occupancy {
  public readonly id: string;
  public readonly zoneId: string;
  public currentCount: number;
  public readonly maxCapacity: number;
  public updatedAt: Date;

  constructor(props: OccupancyProps) {
    this.id = props.id;
    this.zoneId = props.zoneId;
    this.currentCount = props.currentCount;
    this.maxCapacity = props.maxCapacity ?? 100;
    this.updatedAt = props.updatedAt ?? new Date();
  }

  public updateCount(count: number): void {
    this.currentCount = count;
    this.updatedAt = new Date();
  }
}
