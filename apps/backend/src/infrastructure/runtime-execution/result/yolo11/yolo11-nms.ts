import { Injectable } from '@nestjs/common';
import { DetectionBox } from '../models/detection-box';

export interface CandidateDetection {
  box: DetectionBox;
  confidence: number;
  classId: number;
}

@Injectable()
export class Yolo11Nms {
  public suppress(candidates: CandidateDetection[], iouThreshold = 0.45, maxDetections = 300): CandidateDetection[] {
    if (candidates.length === 0) return [];

    // Sort by confidence descending
    const sorted = [...candidates].sort((a, b) => b.confidence - a.confidence);
    const selected: CandidateDetection[] = [];

    for (let i = 0; i < sorted.length; i++) {
      if (selected.length >= maxDetections) break;
      const current = sorted[i];
      if (!current) continue;

      let keep = true;
      for (const sel of selected) {
        if (current.classId === sel.classId && this.calculateIoU(current.box, sel.box) > iouThreshold) {
          keep = false;
          break;
        }
      }

      if (keep) {
        selected.push(current);
      }
    }

    return selected;
  }

  private calculateIoU(a: DetectionBox, b: DetectionBox): number {
    const interX1 = Math.max(a.x1Pixel, b.x1Pixel);
    const interY1 = Math.max(a.y1Pixel, b.y1Pixel);
    const interX2 = Math.min(a.x2Pixel, b.x2Pixel);
    const interY2 = Math.min(a.y2Pixel, b.y2Pixel);

    const interWidth = Math.max(0, interX2 - interX1);
    const interHeight = Math.max(0, interY2 - interY1);
    const interArea = interWidth * interHeight;

    const areaA = a.widthPixel * a.heightPixel;
    const areaB = b.widthPixel * b.heightPixel;
    const unionArea = areaA + areaB - interArea;

    return unionArea > 0 ? interArea / unionArea : 0;
  }
}
