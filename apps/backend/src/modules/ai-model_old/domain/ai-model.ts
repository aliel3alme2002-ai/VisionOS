export interface AIModel {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  framework: string;
  task: string;
  status: string;
  defaultVersion: string;
}
