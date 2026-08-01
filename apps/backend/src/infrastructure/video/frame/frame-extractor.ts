import { Injectable } from '@nestjs/common';
import { Frame } from './frame';

@Injectable()
export class FrameExtractor {
  public extractFrame(
    sourceId: string,
    index: number,
    timestamp: number,
    width = 1920,
    height = 1080,
    rawPixels?: Uint8Array,
  ): Frame {
    const buffer = rawPixels ?? new Uint8Array(width * height * 3);
    return new Frame({
      frameId: `frame-${sourceId}-${index}`,
      timestamp,
      width,
      height,
      pixelFormat: 'RGB24',
      sourceId,
      index,
      buffer,
      metadata: { codec: 'H264', container: 'MP4' },
    });
  }
}
