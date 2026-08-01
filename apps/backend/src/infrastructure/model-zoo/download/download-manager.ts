import { Injectable } from '@nestjs/common';

export interface DownloadTask {
  modelId: string;
  downloadUrl: string;
  targetPath: string;
  bytesDownloaded: number;
  totalBytes: number;
  status: 'PENDING' | 'DOWNLOADING' | 'COMPLETED' | 'FAILED';
  error?: string;
}

@Injectable()
export class DownloadManager {
  private readonly tasks: Map<string, DownloadTask> = new Map();

  public createTask(modelId: string, downloadUrl: string, targetPath: string, totalBytes: number): DownloadTask {
    const task: DownloadTask = {
      modelId,
      downloadUrl,
      targetPath,
      bytesDownloaded: 0,
      totalBytes,
      status: 'PENDING',
    };
    this.tasks.set(modelId, task);
    return task;
  }

  public updateProgress(modelId: string, bytesDownloaded: number): void {
    const task = this.tasks.get(modelId);
    if (task) {
      task.bytesDownloaded = bytesDownloaded;
      task.status = 'DOWNLOADING';
    }
  }

  public markCompleted(modelId: string): void {
    const task = this.tasks.get(modelId);
    if (task) {
      task.status = 'COMPLETED';
      task.bytesDownloaded = task.totalBytes;
    }
  }

  public markFailed(modelId: string, error: string): void {
    const task = this.tasks.get(modelId);
    if (task) {
      task.status = 'FAILED';
      task.error = error;
    }
  }

  public getTask(modelId: string): DownloadTask | null {
    return this.tasks.get(modelId) ?? null;
  }
}
