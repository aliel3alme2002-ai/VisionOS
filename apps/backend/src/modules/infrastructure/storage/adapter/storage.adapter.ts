import { Injectable } from '@nestjs/common';
import { StorageAdapter } from '../../../integration/contracts/storage.adapter';
import { HealthAdapter } from '../../../integration/contracts/health.adapter';
import { StorageObject } from '../../../integration/models/storage-object';
import { AdapterHealth } from '../../../integration/models/adapter-health';

import { UploadService } from '../services/upload.service';
import { DownloadService } from '../services/download.service';
import { DeleteService } from '../services/delete.service';
import { HealthService } from '../services/health.service';
import { StorageClientProvider } from '../provider/storage-client.provider';

@Injectable()
export class StorageAdapterImpl implements StorageAdapter, HealthAdapter {
  constructor(
    private readonly uploadService: UploadService,
    private readonly downloadService: DownloadService,
    private readonly deleteService: DeleteService,
    private readonly healthService: HealthService,
    private readonly clientProvider: StorageClientProvider
  ) {}

  async upload(path: string, data: Buffer): Promise<StorageObject> {
    const res = await this.uploadService.uploadFile(path, data);
    return {
      id: res.objectId,
      path: res.path,
      sizeBytes: res.sizeBytes,
      contentType: 'application/octet-stream',
      createdAt: new Date()
    };
  }

  async download(objectId: string): Promise<Buffer> {
    const res = await this.downloadService.downloadFile(objectId);
    return res.data;
  }

  async delete(objectId: string): Promise<void> {
    await this.deleteService.deleteFile(objectId);
  }

  async exists(objectId: string): Promise<boolean> {
    return this.deleteService.exists(objectId);
  }

  async copy(sourcePath: string, destinationPath: string): Promise<void> {
    await this.clientProvider.getProvider().copy(sourcePath, destinationPath);
  }

  async move(sourcePath: string, destinationPath: string): Promise<void> {
    await this.clientProvider.getProvider().move(sourcePath, destinationPath);
  }

  async generateUrl(objectId: string, expiresInSeconds: number = 3600): Promise<string> {
    return this.clientProvider.getProvider().generateUrl(objectId, expiresInSeconds);
  }

  async health(): Promise<AdapterHealth> {
    return this.healthService.checkHealth();
  }

  async ping(): Promise<boolean> {
    return this.healthService.ping();
  }
}
