import { Injectable } from '@nestjs/common';
import { PixelFormat, PixelFormatHelper } from './pixel-format';

@Injectable()
export class RawFrameDecoder {
  public calculateFrameByteSize(width: number, height: number, format: PixelFormat): number {
    const bpp = PixelFormatHelper.getBytesPerPixel(format);
    return Math.floor(width * height * bpp);
  }

  public parseChunkBuffer(chunk: Uint8Array, expectedFrameSize: number): Uint8Array[] {
    const frames: Uint8Array[] = [];
    let offset = 0;

    while (offset + expectedFrameSize <= chunk.length) {
      const frameBuffer = chunk.subarray(offset, offset + expectedFrameSize);
      frames.push(frameBuffer);
      offset += expectedFrameSize;
    }

    return frames;
  }
}
