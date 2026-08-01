export interface RawImageBuffer {
  width: number;
  height: number;
  channels: number;
  pixels: Uint8Array;
}

export class ImageUtils {
  public static bgrToRgb(pixels: Uint8Array): Uint8Array {
    const rgb = new Uint8Array(pixels.length);
    for (let i = 0; i < pixels.length; i += 3) {
      rgb[i] = pixels[i + 2] ?? 0;     // R
      rgb[i + 1] = pixels[i + 1] ?? 0; // G
      rgb[i + 2] = pixels[i] ?? 0;     // B
    }
    return rgb;
  }
}
