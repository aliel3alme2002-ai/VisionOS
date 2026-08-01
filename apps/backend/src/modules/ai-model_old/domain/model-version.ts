export interface ModelVersion {
  id: string;
  modelId: string;
  version: string;
  checksum: string;
  fileSize: number;
  inputShape: string;
  outputShape: string;
  precision: string;
  createdAt: Date;
}
