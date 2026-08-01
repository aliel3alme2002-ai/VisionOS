import { EdgeResource } from '../domain/edge-resource';

export interface ResourceMonitorProvider {
  fetchMetrics(edgeId: string): Promise<EdgeResource>;
}

export const RESOURCE_MONITOR_PROVIDER = Symbol('RESOURCE_MONITOR_PROVIDER');
