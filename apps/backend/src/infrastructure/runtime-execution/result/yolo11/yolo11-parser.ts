import { Injectable } from '@nestjs/common';
import { Yolo11BoxDecoder } from './yolo11-box-decoder';
import { Yolo11Confidence } from './yolo11-confidence';
import { CandidateDetection } from './yolo11-nms';

@Injectable()
export class Yolo11Parser {
  constructor(
    private readonly boxDecoder: Yolo11BoxDecoder,
    private readonly confidenceChecker: Yolo11Confidence,
  ) {}

  public parseTensorOutputs(
    data: Float32Array,
    dims: number[],
    confidenceThreshold = 0.25,
    imgWidth = 640,
    imgHeight = 640,
  ): CandidateDetection[] {
    const candidates: CandidateDetection[] = [];

    // Handle YOLO11 standard tensor shape [1, 84, 8400] or transposed [1, 8400, 84]
    const numChannels = dims[1] ?? 84;
    const numAnchors = dims[2] ?? 8400;
    const numClasses = numChannels - 4;

    for (let anchorIdx = 0; anchorIdx < numAnchors; anchorIdx++) {
      // 1. Extract cx, cy, w, h
      const cx = data[0 * numAnchors + anchorIdx] ?? 0;
      const cy = data[1 * numAnchors + anchorIdx] ?? 0;
      const w = data[2 * numAnchors + anchorIdx] ?? 0;
      const h = data[3 * numAnchors + anchorIdx] ?? 0;

      // 2. Find max class confidence score
      let maxScore = 0;
      let maxClassId = 0;

      for (let c = 0; c < numClasses; c++) {
        const score = data[(4 + c) * numAnchors + anchorIdx] ?? 0;
        if (score > maxScore) {
          maxScore = score;
          maxClassId = c;
        }
      }

      // 3. Filter by confidence threshold
      if (this.confidenceChecker.filterByConfidence(maxScore, confidenceThreshold)) {
        const box = this.boxDecoder.decodeBox(cx, cy, w, h, imgWidth, imgHeight);
        candidates.push({
          box,
          confidence: maxScore,
          classId: maxClassId,
        });
      }
    }

    return candidates;
  }
}
