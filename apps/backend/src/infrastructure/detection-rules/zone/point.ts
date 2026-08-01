export interface Point2DProps {
  x: number;
  y: number;
}

export class Point2D implements Point2DProps {
  public readonly x: number;
  public readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
