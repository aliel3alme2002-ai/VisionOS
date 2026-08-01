export interface RequestContext {
  requestId: string;
  correlationId: string;
  organizationId?: string;
  userId?: string;
  roles: string[];
  permissions: string[];
  timestamp: number;
}
