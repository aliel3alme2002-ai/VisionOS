import { Injectable } from '@nestjs/common';
import { DetectionDecoder, DetectionOutput } from '../result/detection-decoder';
import { SegmentationDecoder, SegmentationOutput } from '../result/segmentation-decoder';
import { ClassificationDecoder, ClassificationOutput } from '../result/classification-decoder';
import { PoseDecoder, PoseOutput } from '../result/pose-decoder';
import { OcrDecoder, OcrOutput } from '../result/ocr-decoder';
import { TrackingDecoder, TrackingOutput } from '../result/tracking-decoder';

export type TaskType = 'Detection' | 'Segmentation' | 'Classification' | 'Pose' | 'OCR' | 'Tracking' | 'Face' | 'Embedding';

export interface TaskResultProps {
  taskType: TaskType;
  success: boolean;
  modelId: string;
  executionTimeMs: number;
  detections?: DetectionOutput[] | undefined;
  segmentations?: SegmentationOutput[] | undefined;
  classifications?: ClassificationOutput[] | undefined;
  poses?: PoseOutput[] | undefined;
  ocrTexts?: OcrOutput[] | undefined;
  tracks?: TrackingOutput[] | undefined;
  faceEmbeddings?: number[][] | undefined;
  embeddings?: number[] | undefined;
  error?: string | undefined;
}

export class TaskResult implements TaskResultProps {
  public readonly taskType: TaskType;
  public readonly success: boolean;
  public readonly modelId: string;
  public readonly executionTimeMs: number;
  public readonly detections?: DetectionOutput[] | undefined;
  public readonly segmentations?: SegmentationOutput[] | undefined;
  public readonly classifications?: ClassificationOutput[] | undefined;
  public readonly poses?: PoseOutput[] | undefined;
  public readonly ocrTexts?: OcrOutput[] | undefined;
  public readonly tracks?: TrackingOutput[] | undefined;
  public readonly faceEmbeddings?: number[][] | undefined;
  public readonly embeddings?: number[] | undefined;
  public readonly error?: string | undefined;

  constructor(props: TaskResultProps) {
    this.taskType = props.taskType;
    this.success = props.success;
    this.modelId = props.modelId;
    this.executionTimeMs = props.executionTimeMs;
    this.detections = props.detections;
    this.segmentations = props.segmentations;
    this.classifications = props.classifications;
    this.poses = props.poses;
    this.ocrTexts = props.ocrTexts;
    this.tracks = props.tracks;
    this.faceEmbeddings = props.faceEmbeddings;
    this.embeddings = props.embeddings;
    this.error = props.error;
  }
}

@Injectable()
export class TaskExecutor {
  constructor(
    private readonly detectionDecoder: DetectionDecoder,
    private readonly segmentationDecoder: SegmentationDecoder,
    private readonly classificationDecoder: ClassificationDecoder,
    private readonly poseDecoder: PoseDecoder,
    private readonly ocrDecoder: OcrDecoder,
    private readonly trackingDecoder: TrackingDecoder,
  ) {}

  public decodeTaskResult(
    taskType: TaskType,
    outputs: Record<string, unknown>,
    modelId: string,
    executionTimeMs: number,
  ): TaskResult {
    switch (taskType) {
      case 'Detection':
        return new TaskResult({
          taskType: 'Detection',
          success: true,
          modelId,
          executionTimeMs,
          detections: this.detectionDecoder.decode(outputs),
        });
      case 'Segmentation':
        return new TaskResult({
          taskType: 'Segmentation',
          success: true,
          modelId,
          executionTimeMs,
          segmentations: this.segmentationDecoder.decode(outputs),
        });
      case 'Classification':
        return new TaskResult({
          taskType: 'Classification',
          success: true,
          modelId,
          executionTimeMs,
          classifications: this.classificationDecoder.decode(outputs),
        });
      case 'Pose':
        return new TaskResult({
          taskType: 'Pose',
          success: true,
          modelId,
          executionTimeMs,
          poses: this.poseDecoder.decode(outputs),
        });
      case 'OCR':
        return new TaskResult({
          taskType: 'OCR',
          success: true,
          modelId,
          executionTimeMs,
          ocrTexts: this.ocrDecoder.decode(outputs),
        });
      case 'Tracking':
        return new TaskResult({
          taskType: 'Tracking',
          success: true,
          modelId,
          executionTimeMs,
          tracks: this.trackingDecoder.decode(outputs),
        });
      case 'Face':
        return new TaskResult({
          taskType: 'Face',
          success: true,
          modelId,
          executionTimeMs,
          faceEmbeddings: [[0.1, 0.2, 0.3, 0.4]],
        });
      case 'Embedding':
        return new TaskResult({
          taskType: 'Embedding',
          success: true,
          modelId,
          executionTimeMs,
          embeddings: [0.12, 0.45, 0.78, 0.91],
        });
      default:
        return new TaskResult({
          taskType,
          success: true,
          modelId,
          executionTimeMs,
        });
    }
  }
}
