import { Point2D } from './point';

export class Polygon2D {
  public readonly vertices: Point2D[];

  constructor(vertices: Point2D[]) {
    this.vertices = vertices;
  }

  public getBoundingBox(): { minX: number; minY: number; maxX: number; maxY: number } {
    if (this.vertices.length === 0) {
      return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
    }

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const v of this.vertices) {
      if (v.x < minX) minX = v.x;
      if (v.y < minY) minY = v.y;
      if (v.x > maxX) maxX = v.x;
      if (v.y > maxY) maxY = v.y;
    }

    return { minX, minY, maxX, maxY };
  }
}
