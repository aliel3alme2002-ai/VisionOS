export interface GPUDevice {
  edgeId: string;
  vendor: string;
  model: string;
  driver: string;
  cudaVersion: string;
  vram: number;
  utilization: number;
}
