export interface EventMetadata {
  correlationId: string;
  causationId?: string;
  organizationId?: string;
  userId?: string;
  traceId?: string;
  version: string;
}
