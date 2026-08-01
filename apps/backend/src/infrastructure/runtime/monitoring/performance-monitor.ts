import { Injectable } from '@nestjs/common';

@Injectable()
export class PerformanceMonitor {
  private totalInferences = 0;
  private totalLatencyMs = 0;

  public recordInference(latencyMs: number): void {
    this.totalInferences++;
    this.totalLatencyMs += latencyMs;
  }

  public getAverageLatencyMs(): number {
    if (this.totalInferences === 0) return 0;
    return this.totalLatencyMs / this.totalInferences;
  }

  public getCalculatedFps(): number {
    const avgLatency = this.getAverageLatencyMs();
    if (avgLatency === 0) return 0;
    return 1000 / avgLatency;
  }
}
