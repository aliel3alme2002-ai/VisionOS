export interface RecordingPolicy {
  id: string;
  organizationId: string;
  name: string;
  preBufferSeconds: number;
  postBufferSeconds: number;
  maxDuration: number;
  retentionPolicyId: string;
}
