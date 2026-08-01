import { Injectable } from '@nestjs/common';

@Injectable()
export class TensorConverter {
  public convertHwcToNchw(floatPixels: Float32Array, width: number, height: number): Float32Array {
    const totalPixels = width * height;
    const nchw = new Float32Array(floatPixels.length);

    for (let i = 0; i < totalPixels; i++) {
      const r = floatPixels[i * 3] ?? 0;
      const g = floatPixels[i * 3 + 1] ?? 0;
      const b = floatPixels[i * 3 + 2] ?? 0;

      nchw[i] = r;                    // R channel (0)
      nchw[totalPixels + i] = g;        // G channel (1)
      nchw[totalPixels * 2 + i] = b;    // B channel (2)
    }
    return nchw;
  }
}
