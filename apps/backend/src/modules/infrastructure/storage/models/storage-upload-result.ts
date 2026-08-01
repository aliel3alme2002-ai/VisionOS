export interface StorageUploadResult {
  objectId: string;
  path: string;
  sizeBytes: number;
  etag?: string;
}
