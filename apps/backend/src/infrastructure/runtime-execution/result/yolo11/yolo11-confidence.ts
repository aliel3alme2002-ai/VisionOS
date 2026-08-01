import { Injectable } from '@nestjs/common';

@Injectable()
export class Yolo11Confidence {
  public filterByConfidence(confidence: number, threshold = 0.25): boolean {
    return confidence >= threshold;
  }
}
