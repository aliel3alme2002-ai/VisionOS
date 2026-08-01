export class MotionModel {
  public static predictPosition(cx: number, cy: number, vx: number, vy: number, dtSeconds: number): { x: number; y: number } {
    return {
      x: cx + vx * dtSeconds,
      y: cy + vy * dtSeconds,
    };
  }
}
