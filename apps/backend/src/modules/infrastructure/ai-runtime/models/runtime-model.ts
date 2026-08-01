export interface RuntimeModel {
  id: string;
  name: string;
  version: string;
  framework: string;
  inputShape: number[];
  outputShape: number[];
  labels: string[];
  checksum: string;
  status: string;
}
