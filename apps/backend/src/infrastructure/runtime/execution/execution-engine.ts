import { Injectable } from '@nestjs/common';
import { RuntimeManager } from '../manager/runtime-manager';
import { ExecutionRequest } from '../models/execution-request';
import { ExecutionResult } from '../models/execution-result';

@Injectable()
export class ExecutionEngine {
  constructor(private readonly manager: RuntimeManager) {}

  public async processInference(request: ExecutionRequest): Promise<ExecutionResult> {
    return this.manager.execute(request);
  }
}
