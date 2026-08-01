import { Injectable } from '@nestjs/common';
import { PipelineWorker } from './pipeline-worker';

@Injectable()
export class VisionScheduler {
  private readonly workers: Map<string, PipelineWorker> = new Map();
  private readonly maxWorkers = 32;

  public allocateWorker(cameraId: string, worker: PipelineWorker): boolean {
    if (this.workers.size >= this.maxWorkers) {
      return false;
    }
    this.workers.set(cameraId, worker);
    return true;
  }

  public releaseWorker(cameraId: string): void {
    const worker = this.workers.get(cameraId);
    if (worker) {
      worker.stop();
      this.workers.delete(cameraId);
    }
  }

  public getActiveWorkerCount(): number {
    return this.workers.size;
  }
}
