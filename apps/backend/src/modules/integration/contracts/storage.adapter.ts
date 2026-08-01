import { StorageObject } from '../models/storage-object';

export interface StorageAdapter {
  upload(path: string, data: Buffer): Promise<StorageObject>;
  download(objectId: string): Promise<Buffer>;
  delete(objectId: string): Promise<void>;
  exists(objectId: string): Promise<boolean>;
}
