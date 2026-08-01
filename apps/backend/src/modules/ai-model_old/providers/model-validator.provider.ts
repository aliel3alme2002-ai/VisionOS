export interface ModelValidatorProvider {
  validateChecksum(versionId: string, checksum: string): Promise<boolean>;
  validateShape(versionId: string, inputShape: string, outputShape: string): Promise<boolean>;
}

export const MODEL_VALIDATOR_PROVIDER = Symbol('MODEL_VALIDATOR_PROVIDER');
