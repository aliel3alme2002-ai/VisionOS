import { Injectable } from '@nestjs/common';

export interface LoadedImageData {
  width: number;
  height: number;
  channels: number;
  data: Uint8Array;
}

@Injectable()
export class ImageLoader {
  public async loadImage(input: Buffer | string): Promise<LoadedImageData> {
    if (typeof input === 'string') {
      const mockBuffer = Buffer.from(input, 'base64');
      const data = mockBuffer.length > 0 ? new Uint8Array(mockBuffer.buffer, mockBuffer.byteOffset, mockBuffer.byteLength) : new Uint8Array(640 * 640 * 3);
      return { width: 640, height: 640, channels: 3, data };
    }
    const data = new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
    return { width: 640, height: 640, channels: 3, data };
  }
}
