import { Point2D } from '../zone/point';
import { Polygon2D } from '../zone/polygon';

export class RayCasting {
  public static isPointInPolygon(point: Point2D, polygon: Polygon2D): boolean {
    const vertices = polygon.vertices;
    const n = vertices.length;
    if (n < 3) return false;

    let inside = false;
    for (let i = 0, j = n - 1; i < n; j = i++) {
      const vi = vertices[i];
      const vj = vertices[j];
      if (!vi || !vj) continue;

      const intersect =
        vi.y > point.y !== vj.y > point.y &&
        point.x < ((vj.x - vi.x) * (point.y - vi.y)) / (vj.y - vi.y) + vi.x;

      if (intersect) inside = !inside;
    }

    return inside;
  }
}
