import { Injectable } from '@nestjs/common';
import { CostMatrixBuilder } from './cost-matrix';
import { HungarianMatcher, MatchResult } from './hungarian-matcher';
import { DetectionBox } from '../../runtime-execution/result/models/detection-box';

@Injectable()
export class IouMatcher {
  constructor(
    private readonly costBuilder: CostMatrixBuilder,
    private readonly hungarian: HungarianMatcher,
  ) {}

  public matchBoxes(trackBoxes: DetectionBox[], detectionBoxes: DetectionBox[], iouThreshold = 0.45): MatchResult {
    const costMatrix = this.costBuilder.buildIoUCostMatrix(trackBoxes, detectionBoxes);
    const maxCost = 1.0 - iouThreshold;
    return this.hungarian.solve(costMatrix, maxCost, detectionBoxes.length);
  }
}
