import { Injectable, Inject } from '@nestjs/common';
import { RecordingPolicyRepository, RECORDING_POLICY_REPOSITORY } from '../repositories/recording-policy.repository';
import { RecordingPolicy } from '../domain/recording-policy';

@Injectable()
export class RecordingPolicyService {
  constructor(
    @Inject(RECORDING_POLICY_REPOSITORY) private readonly repo: RecordingPolicyRepository
  ) {}

  async getPolicy(organizationId: string): Promise<RecordingPolicy | null> {
    return this.repo.findRecordingPolicy(organizationId);
  }
}
