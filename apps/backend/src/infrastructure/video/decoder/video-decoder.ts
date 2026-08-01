import { Injectable } from '@nestjs/common';
import { FrameExtractor } from '../frame/frame-extractor';
import { Frame } from '../frame/frame';

@Injectable()
export class VideoDecoder {
  constructor(private readonly frameExtractor: FrameExtractor) {}

  public decodePacket(sourceId: string, frameIndex: number, ptsMs: number, width = 1920, height = 1080): Frame {
    return this.frameExtractor.extractFrame(sourceId, frameIndex, ptsMs, width, height);
  }
}
