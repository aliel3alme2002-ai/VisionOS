import { Injectable } from '@nestjs/common';
import { GeometryUtils } from '../utilities/geometry';
import { DetectionBox } from '../../runtime-execution/result/models/detection-box';

@Injectable()
export class CostMatrixBuilder {
  public buildIoUCostMatrix(trackBoxes: DetectionBox[], detectionBoxes: DetectionBox[]): number[][] {
    const rows = trackBoxes.length;
    const cols = detectionBoxes.length;
    const matrix: number[][] = Array.from({ length: rows }, () => new Float64Array(cols) as unknown as number[]);

    for (let i = 0; i < rows; i++) {
      const tBox = trackBoxes[i];
      if (!tBox) continue;

      for (let j = 0; j < cols; j++) {
        const dBox = detectionBoxes[j];
        if (!dBox) continue;
        const iou = GeometryUtils.calculateIoU(tBox, dBox);
        matrix[i]![j] = 1.0 - iou; // Cost is 1 - IoU
      }
    }

    return matrix;
  }
}
