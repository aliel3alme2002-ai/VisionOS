import { Injectable } from '@nestjs/common';

@Injectable()
export class CpuManager {
  public getCpuUsagePercent(): number {
    return 18.2; // Mock CPU telemetry percentage
  }

  public getAvailableThreadCount(): number {
    return 16;
  }
}
