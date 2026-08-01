import { Module } from '@nestjs/common';
import { FrameExtractor } from './frame/frame-extractor';
import { FrameBuffer } from './frame/frame-buffer';
import { FrameCache } from './frame/frame-cache';
import { VideoTimeline } from './timeline/timeline';
import { VideoMonitor } from './statistics/video-monitor';
import { VideoDemuxer } from './decoder/video-demuxer';
import { VideoDecoder } from './decoder/video-decoder';
import { VideoReader } from './reader/video-reader';
import { FrameRateController } from './scheduler/frame-rate-controller';
import { FrameScheduler } from './scheduler/frame-scheduler';
import { VideoPlayer } from './player/video-player';

@Module({
  providers: [
    FrameExtractor,
    FrameBuffer,
    FrameCache,
    VideoTimeline,
    VideoMonitor,
    VideoDemuxer,
    VideoDecoder,
    VideoReader,
    FrameRateController,
    FrameScheduler,
    VideoPlayer,
  ],
  exports: [
    VideoPlayer,
    VideoReader,
    FrameScheduler,
    FrameExtractor,
    FrameBuffer,
    VideoMonitor,
    VideoTimeline,
  ],
})
export class VideoModule {}
