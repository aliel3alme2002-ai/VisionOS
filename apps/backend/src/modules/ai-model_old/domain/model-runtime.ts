export interface ModelRuntime {
  engine: string;
  device: string;
  batchSize: number;
  threads: number;
  optimization: string;
}
