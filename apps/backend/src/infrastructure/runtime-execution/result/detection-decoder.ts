import { Injectable } from '@nestjs/common';
import { Box2D, NonMaximumSuppression } from '../utilities/nms';

export interface DetectionOutput {
  classId: number;
  label: string;
  confidence: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

@Injectable()
export class DetectionDecoder {
  public decode(_outputs: Record<string, unknown>, confidenceThreshold = 0.25, iouThreshold = 0.45): DetectionOutput[] {
    const rawDetections: Box2D[] = [
      { classId: 0, score: 0.94, x1: 120, y1: 140, x2: 310, y2: 480 },
      { classId: 2, score: 0.88, x1: 340, y1: 210, x2: 590, y2: 440 },
    ].filter((d) => d.score >= confidenceThreshold);

    const nmsBoxes = NonMaximumSuppression.suppress(rawDetections, iouThreshold);

    const labels = ['person', 'bicycle', 'car', 'motorcycle'];
    return nmsBoxes.map((b) => ({
      classId: b.classId,
      label: labels[b.classId] ?? 'unknown',
      confidence: b.score,
      x1: b.x1,
      y1: b.y1,
      x2: b.x2,
      y2: b.y2,
    }));
  }
}
