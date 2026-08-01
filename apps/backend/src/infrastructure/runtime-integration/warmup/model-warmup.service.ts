import { Injectable } from '@nestjs/common';
import { RuntimeManager } from '../../runtime/manager/runtime-manager';
import { ExecutionRequest } from '../../runtime/models/execution-request';

export interface WarmupReport {
  modelId: string;
  runtime: string;
  warmupPassesCompleted: Int16Array | number;
  warmupTimeMs: number;
  success: boolean;
}

@Injectable()
export class ModelWarmupService {
  constructor(private readonly runtimeManager: RuntimeManager) {}

  public async warmupModel(modelId: string, runtime: string, passes = 3): Promise<WarmupReport> {
    const startTime = Date.now();

    for (let i = 0; i < passes; i++) {
      const dummyRequest = new ExecutionRequest({
        modelId,
        version: '1.0.0',
        runtime,
        input: { dummy: true },
        batchSize: 1,
        priority: 10,
        timeout: 5000,
        organizationId: 'system-warmup',
      });
      await this.runtimeManager.execute(dummyRequest);
    }

    const warmupTimeMs = Date.now() - startTime;
    return {
      modelId,
      runtime,
      warmupPassesCompleted: passes,
      warmupTimeMs,
      success: true,
    };
  }
}
