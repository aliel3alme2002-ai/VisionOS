export interface StorageMetadata {
  checksum: string;
  etag?: string;
  mimeType: string;
  width?: number;
  height?: number;
  duration?: number;
  createdAt: Date;
}
