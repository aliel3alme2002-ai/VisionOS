import { Injectable, Inject } from '@nestjs/common';
import { DetectionResultRepository, DETECTION_RESULT_REPOSITORY } from '../repositories/detection-result.repository';
import { DetectionResult } from '../domain/detection-result';

@Injectable()
export class ResultNormalizationService {
  constructor(
    @Inject(DETECTION_RESULT_REPOSITORY) private readonly resultRepo: DetectionResultRepository
  ) {}

  async normalizeAndSave(result: DetectionResult): Promise<void> {
    await this.resultRepo.save(result);
  }
}
