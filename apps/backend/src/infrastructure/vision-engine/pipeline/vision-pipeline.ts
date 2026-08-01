import { Injectable } from '@nestjs/common';
import { PipelineContext } from './pipeline-context';
import { FrameProcessor } from './frame-processor';
import { DetectionExecutor } from '../execution/detection-executor';
import { TrackingExecutor } from '../execution/tracking-executor';
import { VisionMonitor } from '../monitoring/vision-monitor';
import { VisionResult } from '../models/vision-result';
import { Frame } from '../../video/frame/frame';

@Injectable()
export class VisionPipeline {
  constructor(
    private readonly frameProcessor: FrameProcessor,
    private readonly detectionExecutor: DetectionExecutor,
    private readonly trackingExecutor: TrackingExecutor,
    private readonly monitor: VisionMonitor,
  ) {}

  public async executePipeline(
    frame: Frame,
    modelId: string,
    enableTracking = true,
  ): Promise<VisionResult> {
    const context = new PipelineContext(frame.frameId, frame.sourceId);
    context.rawFrame = frame;
    this.monitor.recordFrameDecoded();

    // 1. Frame Processing -> NCHW Float32Array Tensor
    context.preprocessedTensor = this.frameProcessor.processFrameToTensor(frame);

    // 2. ONNX Runtime Inference + YOLO11 Decoding
    context.detections = await this.detectionExecutor.executeDetection(
      modelId,
      context.preprocessedTensor,
      frame.timestamp,
    );

    // 3. ByteTrack Multi-Object Tracking
    if (enableTracking) {
      context.trackedObjects = this.trackingExecutor.executeTracking(
        context.detections,
        frame.frameId,
        frame.timestamp,
      );
    }

    context.endTimeMs = Date.now();
    const pipelineTimeMs = context.getElapsedTimeMs();

    this.monitor.recordFrameProcessed(
      pipelineTimeMs,
      context.detections.length,
      context.trackedObjects.length,
    );

    const stats = this.monitor.getStatistics();

    return new VisionResult({
      cameraId: frame.sourceId,
      frameId: frame.frameId,
      timestamp: frame.timestamp,
      processingTimeMs: pipelineTimeMs,
      latencyMs: pipelineTimeMs + 2,
      fps: stats.processingFps,
      detections: context.detections,
      trackedObjects: context.trackedObjects,
      statistics: stats,
    });
  }
}
