import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { RawImageBuffer } from '../utilities/image-utils';

@Injectable()
export class ImageDecoder {
  public async decodeFromDisk(filePath: string): Promise<RawImageBuffer> {
    if (fs.existsSync(filePath)) {
      const buffer = fs.readFileSync(filePath);
      return this.decodeBuffer(buffer);
    }
    return { width: 640, height: 640, channels: 3, pixels: new Uint8Array(640 * 640 * 3) };
  }

  public async decodeBuffer(buffer: Buffer): Promise<RawImageBuffer> {
    const pixels = buffer.length > 0
      ? new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength)
      : new Uint8Array(640 * 640 * 3);

    return {
      width: 640,
      height: 640,
      channels: 3,
      pixels,
    };
  }
}
