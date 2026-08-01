import { Injectable } from '@nestjs/common';
import { StorageClientProvider } from '../provider/storage-client.provider';

@Injectable()
export class DeleteService {
  constructor(private readonly clientProvider: StorageClientProvider) {}

  async deleteFile(objectId: string): Promise<void> {
    await this.clientProvider.getProvider().delete(objectId);
  }

  async exists(objectId: string): Promise<boolean> {
    return this.clientProvider.getProvider().exists(objectId);
  }
}
