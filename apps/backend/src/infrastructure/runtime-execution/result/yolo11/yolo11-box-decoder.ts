import { Injectable } from '@nestjs/common';
import { DetectionBox } from '../models/detection-box';

@Injectable()
export class Yolo11BoxDecoder {
  public decodeBox(
    cx: number,
    cy: number,
    w: number,
    h: number,
    imgWidth = 640,
    imgHeight = 640,
  ): DetectionBox {
    const x1Pixel = Math.max(0, cx - w / 2);
    const y1Pixel = Math.max(0, cy - h / 2);
    const x2Pixel = Math.min(imgWidth, cx + w / 2);
    const y2Pixel = Math.min(imgHeight, cy + h / 2);

    const widthPixel = x2Pixel - x1Pixel;
    const heightPixel = y2Pixel - y1Pixel;

    return new DetectionBox({
      xNormalized: x1Pixel / imgWidth,
      yNormalized: y1Pixel / imgHeight,
      widthNormalized: widthPixel / imgWidth,
      heightNormalized: heightPixel / imgHeight,
      xPixel: x1Pixel,
      yPixel: y1Pixel,
      widthPixel,
      heightPixel,
      x1Pixel,
      y1Pixel,
      x2Pixel,
      y2Pixel,
    });
  }
}
