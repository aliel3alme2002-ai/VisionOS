export interface TrajectoryPoint {
  x: number;
  y: number;
  timestamp: number;
}

export class Trajectory {
  private readonly points: TrajectoryPoint[] = [];
  private readonly maxPoints = 50;

  public addPoint(x: number, y: number, timestamp: number): void {
    if (this.points.length >= this.maxPoints) {
      this.points.shift();
    }
    this.points.push({ x, y, timestamp });
  }

  public getPoints(): TrajectoryPoint[] {
    return [...this.points];
  }
}
