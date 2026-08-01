import { Injectable } from '@nestjs/common';
import { ExecutionRequest } from '../models/execution-request';

@Injectable()
export class BatchExecutor {
  public createBatch(requests: ExecutionRequest[], maxBatchSize: number): ExecutionRequest[] {
    return requests.slice(0, maxBatchSize);
  }
}
