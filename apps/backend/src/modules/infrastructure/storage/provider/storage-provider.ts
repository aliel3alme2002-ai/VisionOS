import { StorageUploadResult } from '../models/storage-upload-result';
import { StorageDownloadResult } from '../models/storage-download-result';
import { StorageHealth } from '../models/storage-health';

export interface StorageProvider {
  upload(path: string, data: Buffer): Promise<StorageUploadResult>;
  download(objectId: string): Promise<StorageDownloadResult>;
  delete(objectId: string): Promise<void>;
  exists(objectId: string): Promise<boolean>;
  copy(sourcePath: string, destinationPath: string): Promise<void>;
  move(sourcePath: string, destinationPath: string): Promise<void>;
  generateUrl(objectId: string, expiresInSeconds: number): Promise<string>;
  getHealth(): Promise<StorageHealth>;
}
