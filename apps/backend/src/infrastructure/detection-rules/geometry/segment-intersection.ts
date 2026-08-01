import { Point2D } from '../zone/point';

export class SegmentIntersection {
  public static doSegmentsIntersect(a: Point2D, b: Point2D, c: Point2D, d: Point2D): boolean {
    const ccw = (p1: Point2D, p2: Point2D, p3: Point2D) => {
      return (p3.y - p1.y) * (p2.x - p1.x) > (p2.y - p1.y) * (p3.x - p1.x);
    };

    return ccw(a, c, d) !== ccw(b, c, d) && ccw(a, b, c) !== ccw(a, b, d);
  }
}
