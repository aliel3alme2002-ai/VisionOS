import { Module } from '@nestjs/common';
import { LiveFrameQueue } from './queue/frame-queue';
import { StreamPriorityQueue } from './queue/priority-queue';
import { StreamMonitor } from './monitoring/stream-monitor';
import { StreamLifecycle } from './control/stream-lifecycle';
import { StreamController } from './control/stream-controller';
import { FrameRouter } from './pipeline/frame-router';
import { FrameDispatcher } from './pipeline/frame-dispatcher';
import { StreamPipeline } from './pipeline/stream-pipeline';
import { StreamWorker } from './worker/stream-worker';
import { WorkerPool } from './worker/worker-pool';
import { StreamRegistry } from './manager/stream-registry';
import { LiveStreamManager } from './manager/live-stream-manager';
import { VideoModule } from '../video/video.module';
import { RuntimeIntegrationModule } from '../runtime-integration/runtime-integration.module';

@Module({
  imports: [VideoModule, RuntimeIntegrationModule],
  providers: [
    LiveFrameQueue,
    StreamPriorityQueue,
    StreamMonitor,
    StreamLifecycle,
    StreamController,
    FrameRouter,
    FrameDispatcher,
    StreamPipeline,
    StreamWorker,
    WorkerPool,
    StreamRegistry,
    LiveStreamManager,
  ],
  exports: [
    LiveStreamManager,
    StreamController,
    StreamMonitor,
    WorkerPool,
    FrameDispatcher,
  ],
})
export class LiveStreamModule {}
