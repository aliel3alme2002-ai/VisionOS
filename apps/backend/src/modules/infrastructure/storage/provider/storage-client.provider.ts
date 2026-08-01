import { Injectable } from '@nestjs/common';
import { StorageProvider } from './storage-provider';

@Injectable()
export class StorageClientProvider {
  getProvider(): StorageProvider {
    return {
      upload: async (path: string, data: Buffer) => ({
        objectId: 'obj_' + Date.now().toString(),
        path,
        sizeBytes: data.length,
        etag: 'etag_mock'
      }),
      download: async () => ({
        data: Buffer.from([]),
        contentType: 'application/octet-stream',
        contentLength: 0
      }),
      delete: async () => {},
      exists: async () => true,
      copy: async () => {},
      move: async () => {},
      generateUrl: async (objectId: string) => 'https://storage.visionos.internal/' + objectId,
      getHealth: async () => ({
        available: true,
        latencyMs: 5,
        totalSpaceBytes: 1099511627776,
        freeSpaceBytes: 536870912000
      })
    };
  }
}
