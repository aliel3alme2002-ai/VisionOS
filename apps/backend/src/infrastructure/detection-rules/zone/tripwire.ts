import { Point2D } from './point';

export class Tripwire {
  public readonly tripwireId: string;
  public readonly p1: Point2D;
  public readonly p2: Point2D;
  public readonly direction: 'A_TO_B' | 'B_TO_A' | 'BOTH';

  constructor(tripwireId: string, p1: Point2D, p2: Point2D, direction: 'A_TO_B' | 'B_TO_A' | 'BOTH' = 'BOTH') {
    this.tripwireId = tripwireId;
    this.p1 = p1;
    this.p2 = p2;
    this.direction = direction;
  }
}
