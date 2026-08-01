import { RecordingPolicy } from '../domain/recording-policy';
import { RetentionPolicy } from '../domain/retention-policy';

export interface RecordingPolicyRepository {
  findRecordingPolicy(organizationId: string): Promise<RecordingPolicy | null>;
  findRetentionPolicy(id: string): Promise<RetentionPolicy | null>;
}

export const RECORDING_POLICY_REPOSITORY = Symbol('RECORDING_POLICY_REPOSITORY');
