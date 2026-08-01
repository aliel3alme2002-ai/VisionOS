import { Injectable } from '@nestjs/common';
import { FfmpegManager } from '../process/ffmpeg-manager';
import { FfmpegConfig } from '../configuration/ffmpeg-config';
import { FrameReader } from './frame-reader';
import { FfmpegSession } from '../models/ffmpeg-session';
import { Frame } from '../../video/frame/frame';

@Injectable()
export class RtspReader {
  private frameIndexCounter: Map<string, number> = new Map();

  constructor(
    private readonly manager: FfmpegManager,
    private readonly frameReader: FrameReader,
  ) {}

  public startRtspStream(
    streamId: string,
    rtspUrl: string,
    config: FfmpegConfig,
    onFrameExtracted: (frame: Frame) => void,
  ): FfmpegSession {
    this.frameIndexCounter.set(streamId, 0);

    return this.manager.startProcess(streamId, rtspUrl, config, (chunk: Uint8Array) => {
      const currentIndex = this.frameIndexCounter.get(streamId) ?? 0;
      const { frames, nextFrameIndex } = this.frameReader.processChunk(chunk, streamId, config, currentIndex);
      this.frameIndexCounter.set(streamId, nextFrameIndex);

      for (const frame of frames) {
        onFrameExtracted(frame);
      }
    });
  }

  public stopRtspStream(streamId: string): boolean {
    this.frameIndexCounter.delete(streamId);
    return this.manager.stopProcess(streamId);
  }
}
