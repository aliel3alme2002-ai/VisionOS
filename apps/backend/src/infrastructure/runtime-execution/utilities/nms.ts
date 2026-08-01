export interface Box2D {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  score: number;
  classId: number;
}

export class NonMaximumSuppression {
  public static suppress(boxes: Box2D[], iouThreshold = 0.45, maxOutputBoxes = 100): Box2D[] {
    const sorted = [...boxes].sort((a, b) => b.score - a.score);
    const selected: Box2D[] = [];

    for (const box of sorted) {
      if (selected.length >= maxOutputBoxes) break;
      let keep = true;

      for (const sel of selected) {
        if (box.classId === sel.classId && this.calculateIoU(box, sel) > iouThreshold) {
          keep = false;
          break;
        }
      }

      if (keep) {
        selected.push(box);
      }
    }

    return selected;
  }

  private static calculateIoU(a: Box2D, b: Box2D): number {
    const interX1 = Math.max(a.x1, b.x1);
    const interY1 = Math.max(a.y1, b.y1);
    const interX2 = Math.min(a.x2, b.x2);
    const interY2 = Math.min(a.y2, b.y2);

    const interArea = Math.max(0, interX2 - interX1) * Math.max(0, interY2 - interY1);
    const areaA = (a.x2 - a.x1) * (a.y2 - a.y1);
    const areaB = (b.x2 - b.x1) * (b.y2 - b.y1);

    const unionArea = areaA + areaB - interArea;
    return unionArea > 0 ? interArea / unionArea : 0;
  }
}
