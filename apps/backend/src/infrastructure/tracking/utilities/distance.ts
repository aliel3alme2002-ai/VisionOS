export class DistanceUtils {
  public static euclideanDistance(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  public static calculateDirection(vx: number, vy: number): number {
    // Angle in degrees 0-360
    const rad = Math.atan2(vy, vx);
    const deg = (rad * 180) / Math.PI;
    return deg >= 0 ? deg : deg + 360;
  }
}
