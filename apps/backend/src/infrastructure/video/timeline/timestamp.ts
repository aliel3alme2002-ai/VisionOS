export class VideoTimestamp {
  public static ptsToSeconds(ptsMs: number): number {
    return ptsMs / 1000.0;
  }

  public static secondsToPts(seconds: number): number {
    return Math.round(seconds * 1000);
  }
}
