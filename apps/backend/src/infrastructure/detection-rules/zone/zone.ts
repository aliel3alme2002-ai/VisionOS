import { Polygon2D } from './polygon';
import { Tripwire } from './tripwire';

export interface ZoneProps {
  zoneId: string;
  name: string;
  polygon: Polygon2D;
  tripwires?: Tripwire[] | undefined;
  maxCapacity?: number | undefined;
  dwellTimeThresholdSeconds?: number | undefined;
}

export class Zone implements ZoneProps {
  public readonly zoneId: string;
  public readonly name: string;
  public readonly polygon: Polygon2D;
  public readonly tripwires?: Tripwire[] | undefined;
  public readonly maxCapacity?: number | undefined;
  public readonly dwellTimeThresholdSeconds?: number | undefined;

  constructor(props: ZoneProps) {
    this.zoneId = props.zoneId;
    this.name = props.name;
    this.polygon = props.polygon;
    this.tripwires = props.tripwires;
    this.maxCapacity = props.maxCapacity;
    this.dwellTimeThresholdSeconds = props.dwellTimeThresholdSeconds;
  }
}
