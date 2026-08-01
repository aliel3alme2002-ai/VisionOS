import { Injectable } from '@nestjs/common';
import { RawFrameDecoder } from '../decoder/raw-frame-decoder';
import { FfmpegConfig } from '../configuration/ffmpeg-config';
import { FrameExtractor } from '../../video/frame/frame-extractor';
import { Frame } from '../../video/frame/frame';

@Injectable()
export class FrameReader {
  constructor(
    private readonly rawDecoder: RawFrameDecoder,
    private readonly frameExtractor: FrameExtractor,
  ) {}

  public processChunk(
    chunk: Uint8Array,
    streamId: string,
    config: FfmpegConfig,
    frameIndexOffset: number,
  ): { frames: Frame[]; nextFrameIndex: number } {
    const expectedSize = this.rawDecoder.calculateFrameByteSize(config.width, config.height, config.pixelFormat);
    const rawFrames = this.rawDecoder.parseChunkBuffer(chunk, expectedSize);

    let idx = frameIndexOffset;
    const frames: Frame[] = [];

    for (const rawBuf of rawFrames) {
      const ptsMs = idx * (1000 / config.fps);
      const frame = this.frameExtractor.extractFrame(streamId, idx, ptsMs, config.width, config.height, rawBuf);
      frames.push(frame);
      idx++;
    }

    return { frames, nextFrameIndex: idx };
  }
}
