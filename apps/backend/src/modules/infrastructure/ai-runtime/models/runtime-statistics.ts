export interface RuntimeStatistics {
  processedFrames: number;
  failedFrames: number;
  averageFPS: number;
  averageLatency: number;
  averageInferenceTime: number;
  memoryUsage: number;
  gpuUsage: number;
  cpuUsage: number;
  queueDepth: number;
}
