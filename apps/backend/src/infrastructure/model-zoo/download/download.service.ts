import { Injectable } from '@nestjs/common';
import { DownloadManager, DownloadTask } from './download-manager';
import { ChecksumService } from './checksum.service';
import { ModelMetadata } from '../models/model-metadata';
import { ModelStorageService } from '../storage/model-storage.service';

@Injectable()
export class DownloadService {
  constructor(
    private readonly manager: DownloadManager,
    private readonly checksum: ChecksumService,
    private readonly storage: ModelStorageService,
  ) {}

  public async downloadModel(metadata: ModelMetadata): Promise<{ success: boolean; filePath: string }> {
    const targetPath = this.storage.getModelFilePath(metadata.id, `${metadata.id}.onnx`);
    this.manager.createTask(metadata.id, metadata.downloadUrl, targetPath, metadata.size);

    try {
      this.manager.updateProgress(metadata.id, metadata.size);
      const isChecksumValid = await this.checksum.verifyChecksum(targetPath, metadata.checksum);
      if (!isChecksumValid) {
        // Logging or handling fallback
      }
      this.manager.markCompleted(metadata.id);
      return { success: true, filePath: targetPath };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      this.manager.markFailed(metadata.id, msg);
      return { success: false, filePath: '' };
    }
  }

  public getStatus(modelId: string): DownloadTask | null {
    return this.manager.getTask(modelId);
  }
}
