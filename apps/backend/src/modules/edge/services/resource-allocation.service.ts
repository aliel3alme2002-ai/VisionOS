import { Injectable, Inject } from '@nestjs/common';
import { EdgeResource } from '../domain/edge-resource';
import { EdgeRepository, EDGE_REPOSITORY } from '../repositories/edge.repository';
import { ResourceMonitorProvider, RESOURCE_MONITOR_PROVIDER } from '../providers/resource-monitor.provider';

@Injectable()
export class ResourceAllocationService {
  constructor(
    @Inject(EDGE_REPOSITORY) private readonly edgeRepo: EdgeRepository,
    @Inject(RESOURCE_MONITOR_PROVIDER) private readonly resourceProvider: ResourceMonitorProvider
  ) {}

  async updateResources(edgeId: string): Promise<void> {
    const metrics: EdgeResource = await this.resourceProvider.fetchMetrics(edgeId);
    await this.edgeRepo.saveResource(metrics);
  }
}
