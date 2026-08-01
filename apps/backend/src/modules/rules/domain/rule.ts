export interface Rule {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  enabled: boolean;
  priority: number;
  groupId?: string;
  timeWindowId?: string;
  createdAt: Date;
  updatedAt: Date;
}
