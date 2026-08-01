import { Injectable } from '@nestjs/common';
import { ExecutionRequest } from '../models/execution-request';

@Injectable()
export class QueueManager {
  private readonly queue: ExecutionRequest[] = [];

  public enqueue(request: ExecutionRequest): void {
    this.queue.push(request);
    this.queue.sort((a, b) => b.priority - a.priority);
  }

  public dequeue(): ExecutionRequest | null {
    return this.queue.shift() ?? null;
  }

  public getQueueSize(): number {
    return this.queue.length;
  }
}
