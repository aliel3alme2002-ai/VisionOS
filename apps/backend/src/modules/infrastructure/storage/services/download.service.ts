import { Injectable } from '@nestjs/common';
import { StorageClientProvider } from '../provider/storage-client.provider';
import { StorageDownloadResult } from '../models/storage-download-result';

@Injectable()
export class DownloadService {
  constructor(private readonly clientProvider: StorageClientProvider) {}

  async downloadFile(objectId: string): Promise<StorageDownloadResult> {
    return this.clientProvider.getProvider().download(objectId);
  }
}
