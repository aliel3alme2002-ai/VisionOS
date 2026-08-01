import { StorageProviderType } from './storage-provider-type';
import { StorageMetadata } from './storage-metadata';

export type ObjectLifecycleState = 'UPLOADING' | 'AVAILABLE' | 'ARCHIVED' | 'DELETED' | 'FAILED';

export interface StorageObjectState {
  id: string;
  organizationId: string;
  bucket: string;
  key: string;
  contentType: string;
  size: number;
  checksum: string;
  createdAt: Date;
  updatedAt: Date;
  provider: StorageProviderType;
  lifecycleState: ObjectLifecycleState;
  metadata?: StorageMetadata;
}
