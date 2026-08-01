export interface RetentionPolicy {
  id: string;
  organizationId: string;
  name: string;
  retentionDays: number;
  archiveAfterDays: number;
  deleteAfterDays: number;
  enabled: boolean;
}
