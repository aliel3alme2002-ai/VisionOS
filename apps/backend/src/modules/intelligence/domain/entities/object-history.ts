export interface HistoryPoint {
  x: number;
  y: number;
  timestamp: Date;
}

export class ObjectHistory {
  public readonly trackingId: string;
  public readonly positions: HistoryPoint[];

  constructor(trackingId: string, positions?: HistoryPoint[]) {
    this.trackingId = trackingId;
    this.positions = positions ?? [];
  }

  public addPoint(x: number, y: number): void {
    this.positions.push({ x, y, timestamp: new Date() });
  }
}
