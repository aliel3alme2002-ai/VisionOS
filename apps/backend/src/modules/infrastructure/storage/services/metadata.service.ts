import { Injectable } from '@nestjs/common';
import { StorageMetadata } from '../models/storage-metadata';

@Injectable()
export class MetadataService {
  async getMetadata(objectId: string): Promise<StorageMetadata> {
    return {
      checksum: 'sha256_dummy_' + objectId,
      mimeType: 'video/mp4',
      createdAt: new Date()
    };
  }
}
