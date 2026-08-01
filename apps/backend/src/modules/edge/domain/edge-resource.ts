export interface EdgeResource {
  edgeId: string;
  cpuCores: number;
  cpuUsage: number;
  memoryTotal: number;
  memoryUsed: number;
  gpuCount: number;
  gpuMemory: number;
  gpuUsage: number;
  diskTotal: number;
  diskUsed: number;
  temperature: number;
}
