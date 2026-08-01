import { Module } from '@nestjs/common';
import { DetectionExecutor } from './execution/detection-executor';
import { TrackingExecutor } from './execution/tracking-executor';
import { FrameProcessor } from './pipeline/frame-processor';
import { VisionPipeline } from './pipeline/vision-pipeline';
import { PipelineWorker } from './scheduler/pipeline-worker';
import { VisionScheduler } from './scheduler/vision-scheduler';
import { VisionMonitor } from './monitoring/vision-monitor';
import { VisionManager } from './engine/vision-manager';
import { VisionEngine } from './engine/vision-engine';

import { RuntimeExecutionModule } from '../runtime-execution/runtime-execution.module';
import { RuntimeModule } from '../runtime/runtime.module';
import { TrackingModule } from '../tracking/tracking.module';
import { VideoModule } from '../video/video.module';
import { LiveStreamModule } from '../live-stream/live-stream.module';
import { FfmpegModule } from '../ffmpeg/ffmpeg.module';

@Module({
  imports: [
    RuntimeModule,
    RuntimeExecutionModule,
    TrackingModule,
    VideoModule,
    LiveStreamModule,
    FfmpegModule,
  ],
  providers: [
    DetectionExecutor,
    TrackingExecutor,
    FrameProcessor,
    VisionPipeline,
    PipelineWorker,
    VisionScheduler,
    VisionMonitor,
    VisionManager,
    VisionEngine,
  ],
  exports: [
    VisionEngine,
    VisionManager,
    VisionPipeline,
    VisionMonitor,
  ],
})
export class VisionEngineModule {}
