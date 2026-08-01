import { DetectionBox } from '../../runtime-execution/result/models/detection-box';

export class GeometryUtils {
  public static calculateIoU(a: DetectionBox, b: DetectionBox): number {
    const interX1 = Math.max(a.x1Pixel, b.x1Pixel);
    const interY1 = Math.max(a.y1Pixel, b.y1Pixel);
    const interX2 = Math.min(a.x2Pixel, b.x2Pixel);
    const interY2 = Math.min(a.y2Pixel, b.y2Pixel);

    const interW = Math.max(0, interX2 - interX1);
    const interH = Math.max(0, interY2 - interY1);
    const interArea = interW * interH;

    const areaA = a.widthPixel * a.heightPixel;
    const areaB = b.widthPixel * b.heightPixel;
    const unionArea = areaA + areaB - interArea;

    return unionArea > 0 ? interArea / unionArea : 0;
  }
}
