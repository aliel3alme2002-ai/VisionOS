import { Module } from '@nestjs/common';
import { ImageDecoder } from './image/image-decoder';
import { ImageResizer } from './image/image-resizer';
import { ImageNormalizer } from './image/image-normalizer';
import { TensorConverter } from './tensor/tensor-converter';
import { TensorBuilder } from './tensor/tensor-builder';
import { DetectionDecoder } from './result/detection-decoder';
import { SegmentationDecoder } from './result/segmentation-decoder';
import { ClassificationDecoder } from './result/classification-decoder';
import { PoseDecoder } from './result/pose-decoder';
import { OcrDecoder } from './result/ocr-decoder';
import { TrackingDecoder } from './result/tracking-decoder';
import { TaskExecutor } from './execution/task-executor';
import { RuntimeExecutor } from './execution/runtime-executor';
import { RuntimeModule } from '../runtime/runtime.module';

import { Yolo11BoxDecoder } from './result/yolo11/yolo11-box-decoder';
import { Yolo11Confidence } from './result/yolo11/yolo11-confidence';
import { Yolo11LabelMapper } from './result/yolo11/yolo11-label-mapper';
import { Yolo11Nms } from './result/yolo11/yolo11-nms';
import { Yolo11Parser } from './result/yolo11/yolo11-parser';
import { Yolo11Decoder } from './result/yolo11/yolo11-decoder';

@Module({
  imports: [RuntimeModule],
  providers: [
    ImageDecoder,
    ImageResizer,
    ImageNormalizer,
    TensorConverter,
    TensorBuilder,
    DetectionDecoder,
    SegmentationDecoder,
    ClassificationDecoder,
    PoseDecoder,
    OcrDecoder,
    TrackingDecoder,
    TaskExecutor,
    RuntimeExecutor,
    Yolo11BoxDecoder,
    Yolo11Confidence,
    Yolo11LabelMapper,
    Yolo11Nms,
    Yolo11Parser,
    Yolo11Decoder,
  ],
  exports: [
    RuntimeExecutor,
    TaskExecutor,
    ImageDecoder,
    TensorBuilder,
    Yolo11Decoder,
    Yolo11Parser,
    Yolo11Nms,
  ],
})
export class RuntimeExecutionModule {}
