import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageNormalizer {
  public normalizeToFloat32(pixels: Uint8Array, mean = [0, 0, 0], std = [1, 1, 1]): Float32Array {
    const floatData = new Float32Array(pixels.length);
    for (let i = 0; i < pixels.length; i++) {
      const val = (pixels[i] ?? 0) / 255.0;
      const channelIdx = i % 3;
      const m = mean[channelIdx] ?? 0;
      const s = std[channelIdx] ?? 1;
      floatData[i] = (val - m) / s;
    }
    return floatData;
  }
}
