import { Injectable, Inject } from '@nestjs/common';
import { EdgeNode } from '../domain/edge-node';
import { EdgeRepository, EDGE_REPOSITORY } from '../repositories/edge.repository';
import { EdgeRuntimeProvider, EDGE_RUNTIME_PROVIDER } from '../providers/edge-runtime.provider';

@Injectable()
export class EdgeManagementService {
  constructor(
    @Inject(EDGE_REPOSITORY) private readonly edgeRepo: EdgeRepository,
    @Inject(EDGE_RUNTIME_PROVIDER) private readonly edgeProvider: EdgeRuntimeProvider
  ) {}

  async registerEdge(node: EdgeNode): Promise<void> {
    await this.edgeRepo.saveNode(node);
  }

  async removeEdge(id: string): Promise<void> {
    await this.edgeRepo.deleteNode(id);
  }

  async restartEdge(id: string): Promise<boolean> {
    return this.edgeProvider.restart(id);
  }
}
