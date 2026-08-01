import { Injectable } from '@nestjs/common';

@Injectable()
export class GpuManager {
  public getGpuUsagePercent(): number {
    return 25.5; // Mock GPU telemetry percentage
  }

  public getTotalVRAMMb(): number {
    return 16384;
  }

  public getAvailableVRAMMb(): number {
    return 12288;
  }
}
