import { Injectable, Inject } from '@nestjs/common';
import { ModelValidatorProvider, MODEL_VALIDATOR_PROVIDER } from '../providers/model-validator.provider';

@Injectable()
export class ModelValidationService {
  constructor(
    @Inject(MODEL_VALIDATOR_PROVIDER) private readonly validatorProvider: ModelValidatorProvider
  ) {}

  async validateModelChecksum(versionId: string, checksum: string): Promise<boolean> {
    return this.validatorProvider.validateChecksum(versionId, checksum);
  }

  async validateModelShape(versionId: string, inputShape: string, outputShape: string): Promise<boolean> {
    return this.validatorProvider.validateShape(versionId, inputShape, outputShape);
  }
}
