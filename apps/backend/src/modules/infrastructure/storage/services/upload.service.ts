import { Injectable } from '@nestjs/common';
import { StorageClientProvider } from '../provider/storage-client.provider';
import { StorageUploadResult } from '../models/storage-upload-result';

@Injectable()
export class UploadService {
  constructor(private readonly clientProvider: StorageClientProvider) {}

  async uploadFile(path: string, data: Buffer): Promise<StorageUploadResult> {
    return this.clientProvider.getProvider().upload(path, data);
  }
}
