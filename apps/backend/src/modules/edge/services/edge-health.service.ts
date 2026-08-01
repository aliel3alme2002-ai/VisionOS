import { Injectable, Inject } from '@nestjs/common';
import { EdgeRuntimeProvider, EDGE_RUNTIME_PROVIDER } from '../providers/edge-runtime.provider';

@Injectable()
export class EdgeHealthService {
  constructor(
    @Inject(EDGE_RUNTIME_PROVIDER) private readonly edgeProvider: EdgeRuntimeProvider
  ) {}

  async checkHealth(edgeId: string): Promise<boolean> {
    return this.edgeProvider.ping(edgeId);
  }
}
