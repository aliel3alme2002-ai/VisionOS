export type PixelFormat = 'rgb24' | 'nv12' | 'yuv420p';

export class PixelFormatHelper {
  public static getBytesPerPixel(format: PixelFormat): number {
    switch (format) {
      case 'rgb24':
        return 3;
      case 'nv12':
      case 'yuv420p':
        return 1.5;
      default:
        return 3;
    }
  }
}
