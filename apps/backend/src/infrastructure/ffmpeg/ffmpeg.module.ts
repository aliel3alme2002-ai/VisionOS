import { Module } from '@nestjs/common';
import { RawFrameDecoder } from './decoder/raw-frame-decoder';
import { FfmpegHealth } from './monitoring/ffmpeg-health';
import { FfmpegManager } from './process/ffmpeg-manager';
import { FrameReader } from './reader/frame-reader';
import { RtspReader } from './reader/rtsp-reader';
import { VideoModule } from '../video/video.module';

@Module({
  imports: [VideoModule],
  providers: [
    RawFrameDecoder,
    FfmpegHealth,
    FfmpegManager,
    FrameReader,
    RtspReader,
  ],
  exports: [
    RtspReader,
    FfmpegManager,
    FfmpegHealth,
    RawFrameDecoder,
  ],
})
export class FfmpegModule {}
