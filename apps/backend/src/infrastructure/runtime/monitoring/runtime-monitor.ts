import { Injectable } from '@nestjs/common';
import { GpuManager } from '../memory/gpu-manager';
import { CpuManager } from '../memory/cpu-manager';
import { MemoryManager } from '../memory/memory-manager';
import { PerformanceMonitor } from './performance-monitor';
import { QueueManager } from '../scheduler/queue-manager';
import { RuntimeManager } from '../manager/runtime-manager';
import { RuntimeStatistics } from '../models/runtime-statistics';

@Injectable()
export class RuntimeMonitor {
  constructor(
    private readonly gpuManager: GpuManager,
    private readonly cpuManager: CpuManager,
    private readonly memoryManager: MemoryManager,
    private readonly perfMonitor: PerformanceMonitor,
    private readonly queueManager: QueueManager,
    private readonly runtimeManager: RuntimeManager,
  ) {}

  public getStatistics(): RuntimeStatistics {
    return new RuntimeStatistics({
      gpuUsagePercent: this.gpuManager.getGpuUsagePercent(),
      cpuUsagePercent: this.cpuManager.getCpuUsagePercent(),
      ramUsageMb: this.memoryManager.getRAMUsage(),
      vramUsageMb: this.memoryManager.getVRAMUsage(),
      fps: this.perfMonitor.getCalculatedFps(),
      latencyMs: this.perfMonitor.getAverageLatencyMs(),
      queueSize: this.queueManager.getQueueSize(),
      activeSessions: this.runtimeManager.listSessions().length,
      timestamp: new Date(),
    });
  }
}
