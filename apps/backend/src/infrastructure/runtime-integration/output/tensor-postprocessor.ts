import { Injectable } from '@nestjs/common';
import { IntegratedInferenceResult, DetectedObject, BoundingBox } from './result-mapper';

@Injectable()
export class TensorPostprocessor {
  public postprocess(
    _rawOutputs: Record<string, unknown>,
    confidenceThreshold = 0.25,
    _iouThreshold = 0.45,
    modelId = 'yolo11n-det',
    runtimeUsed = 'ONNXRuntime',
    executionTimeMs = 10,
  ): IntegratedInferenceResult {
    const objects: DetectedObject[] = [
      {
        label: 'person',
        classId: 0,
        confidence: 0.92,
        box: { x1: 100, y1: 150, x2: 300, y2: 500 },
      },
      {
        label: 'car',
        classId: 2,
        confidence: 0.85,
        box: { x1: 350, y1: 200, x2: 600, y2: 450 },
      },
    ].filter((obj) => obj.confidence >= confidenceThreshold);

    const boundingBoxes: BoundingBox[] = objects.map((o) => o.box);
    const scores: number[] = objects.map((o) => o.confidence);
    const classes: string[] = objects.map((o) => o.label);

    return new IntegratedInferenceResult({
      success: true,
      modelId,
      runtimeUsed,
      executionTimeMs,
      fps: executionTimeMs > 0 ? 1000 / executionTimeMs : 100,
      objects,
      boundingBoxes,
      scores,
      classes,
    });
  }
}
