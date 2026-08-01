import { Injectable } from '@nestjs/common';
import { RuntimeManager } from '../manager/runtime-manager';

@Injectable()
export class HealthMonitor {
  constructor(private readonly manager: RuntimeManager) {}

  public isHealthy(): boolean {
    const sessions = this.manager.listSessions();
    return !sessions.some((s) => s.state === 'FAILED');
  }
}
