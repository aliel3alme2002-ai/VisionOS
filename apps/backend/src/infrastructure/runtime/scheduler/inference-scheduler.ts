import { Injectable } from '@nestjs/common';
import { QueueManager } from './queue-manager';
import { ExecutionRequest } from '../models/execution-request';
import { ExecutionResult } from '../models/execution-result';
import { RuntimeManager } from '../manager/runtime-manager';

@Injectable()
export class InferenceScheduler {
  constructor(
    private readonly queueManager: QueueManager,
    private readonly runtimeManager: RuntimeManager,
  ) {}

  public async schedule(request: ExecutionRequest): Promise<ExecutionResult> {
    this.queueManager.enqueue(request);
    const next = this.queueManager.dequeue();
    if (!next) {
      return new ExecutionResult({
        success: false,
        latency: 0,
        fps: 0,
        memoryUsage: 0,
        gpuUsage: 0,
        outputs: {},
        error: 'Queue empty',
      });
    }
    return this.runtimeManager.execute(next);
  }
}
