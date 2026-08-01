import { EdgeStatus } from '../enums/edge-status';

export interface EdgeNode {
  id: string;
  organizationId: string;
  name: string;
  hostname: string;
  ipAddress: string;
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  status: EdgeStatus;
  supportedModels: string[];
}
