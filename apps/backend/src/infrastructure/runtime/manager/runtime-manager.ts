import { Injectable } from '@nestjs/common';
import { RuntimeRegistry } from './runtime-registry';
import { RuntimeSession } from './runtime-session';
import { ExecutionRequest } from '../models/execution-request';
import { ExecutionResult } from '../models/execution-result';

@Injectable()
export class RuntimeManager {
  private readonly activeSessions: Map<string, RuntimeSession> = new Map();

  constructor(private readonly registry: RuntimeRegistry) {}

  public async loadModel(modelId: string, version: string, runtimeName: string, modelPath: string): Promise<RuntimeSession | null> {
    const plugin = this.registry.getPlugin(runtimeName);
    if (!plugin) return null;

    const sessionId = `${runtimeName}-${modelId}-${version}`;
    const session = new RuntimeSession({
      sessionId,
      modelId,
      version,
      runtime: runtimeName,
      state: 'LOADING',
      allocatedVRAMMb: 512,
      createdAt: new Date(),
    });
    this.activeSessions.set(sessionId, session);

    const success = await plugin.loadModel(modelId, modelPath);
    if (success) {
      session.state = 'READY';
      return session;
    } else {
      session.state = 'FAILED';
      return null;
    }
  }

  public async execute(request: ExecutionRequest): Promise<ExecutionResult> {
    const plugin = this.registry.getPlugin(request.runtime);
    if (!plugin) {
      return new ExecutionResult({
        success: false,
        latency: 0,
        fps: 0,
        memoryUsage: 0,
        gpuUsage: 0,
        outputs: {},
        error: `Runtime plugin '${request.runtime}' not found`,
      });
    }

    const sessionId = `${request.runtime}-${request.modelId}-${request.version}`;
    const session = this.activeSessions.get(sessionId);
    if (session) session.state = 'RUNNING';

    const result = await plugin.execute(request);

    if (session) session.state = 'READY';
    return result;
  }

  public async unloadModel(sessionId: string): Promise<boolean> {
    const session = this.activeSessions.get(sessionId);
    if (!session) return false;

    session.state = 'STOPPING';
    const plugin = this.registry.getPlugin(session.runtime);
    if (plugin) {
      await plugin.unloadModel(session.modelId);
    }
    session.state = 'UNLOADED';
    this.activeSessions.delete(sessionId);
    return true;
  }

  public getSession(sessionId: string): RuntimeSession | null {
    return this.activeSessions.get(sessionId) ?? null;
  }

  public listSessions(): RuntimeSession[] {
    return Array.from(this.activeSessions.values());
  }
}
