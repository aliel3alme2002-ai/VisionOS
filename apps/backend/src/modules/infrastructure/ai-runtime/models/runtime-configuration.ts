export interface RuntimeConfiguration {
  runtimeId: string;
  engine: string;
  device: 'CPU' | 'GPU' | 'TPU' | 'NPU';
  batchSize: number;
  precision: 'FP32' | 'FP16' | 'INT8';
  settings: Record<string, unknown>;
}
