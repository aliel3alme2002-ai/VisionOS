import { Injectable } from '@nestjs/common';
import { StreamWorker } from './stream-worker';

@Injectable()
export class WorkerPool {
  private readonly activeWorkers: Map<string, StreamWorker> = new Map();
  private readonly maxWorkers = 32;

  public acquireWorker(streamId: string, worker: StreamWorker): StreamWorker | null {
    if (this.activeWorkers.size >= this.maxWorkers) {
      return null;
    }
    this.activeWorkers.set(streamId, worker);
    return worker;
  }

  public releaseWorker(streamId: string): void {
    const worker = this.activeWorkers.get(streamId);
    if (worker) {
      worker.stop();
      this.activeWorkers.delete(streamId);
    }
  }

  public getActiveWorkerCount(): number {
    return this.activeWorkers.size;
  }
}
