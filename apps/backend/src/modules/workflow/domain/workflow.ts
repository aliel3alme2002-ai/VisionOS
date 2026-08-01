export interface Workflow {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  enabled: boolean;
  version: string;
  createdAt: Date;
  updatedAt: Date;
}
