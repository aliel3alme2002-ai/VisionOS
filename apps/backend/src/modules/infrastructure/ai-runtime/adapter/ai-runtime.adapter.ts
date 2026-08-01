import { Injectable } from '@nestjs/common';
import { InferenceAdapter } from '../../../integration/contracts/inference.adapter';
import { HealthAdapter } from '../../../integration/contracts/health.adapter';
import { ConfigurationAdapter } from '../../../integration/contracts/configuration.adapter';
import { ConnectionAdapter } from '../../../integration/contracts/connection.adapter';

import { InferenceRequest } from '../../../integration/models/inference-request';
import { InferenceResponse } from '../../../integration/models/inference-response';
import { AdapterHealth } from '../../../integration/models/adapter-health';

import { ConnectionService } from '../connection/connection.service';
import { ConfigurationService } from '../configuration/configuration.service';
import { HealthService } from '../health/health.service';
import { RuntimeManager } from '../runtime/runtime-manager';
import { PipelineService } from '../pipeline/pipeline.service';

@Injectable()
export class AiRuntimeAdapter implements 
  InferenceAdapter, 
  HealthAdapter, 
  ConfigurationAdapter, 
  ConnectionAdapter {

  constructor(
    private readonly connectionService: ConnectionService,
    private readonly configurationService: ConfigurationService,
    private readonly healthService: HealthService,
    private runtimeManager: RuntimeManager,
    private readonly pipelineService: PipelineService
  ) {}

  async connect(target: string): Promise<boolean> {
    return this.connectionService.connect(target);
  }

  async disconnect(target: string): Promise<void> {
    await this.connectionService.disconnect(target);
  }

  async reconnect(target: string): Promise<boolean> {
    await this.disconnect(target);
    return this.connect(target);
  }

  async loadModel(modelId: string): Promise<void> {
    if (!modelId) return;
    // In a real implementation we would look up the session for the model via this.runtimeManager
    // For now we fulfill the interface contract.
    await this.runtimeManager.loadModel('dummy-session', { id: modelId } as any);
  }

  async unloadModel(modelId: string): Promise<void> {
    if (!modelId) return;
    // Fulfilled by this.runtimeManager in reality.
    await this.runtimeManager.unloadModel('dummy-session');
  }

  async runInference(request: InferenceRequest): Promise<InferenceResponse> {
    // Bridge Integration Contract -> Internal Pipeline Model
    const localReq = {
      requestId: request.requestId,
      pipelineId: 'default',
      cameraId: 'cam_1',
      frameId: 'f_1',
      timestamp: Date.now(),
      image: Buffer.from([]),
      metadata: request.parameters || {}
    };
    return this.pipelineService.execute(localReq, 'TensorRT');
  }

  async loadConfiguration(deviceId: string): Promise<Record<string, unknown>> {
    const config = await this.configurationService.loadConfig(deviceId);
    return config as unknown as Record<string, unknown>;
  }

  async saveConfiguration(deviceId: string, config: Record<string, unknown>): Promise<void> {
    await this.configurationService.saveConfig(deviceId, config);
  }

  async health(): Promise<AdapterHealth> {
    return this.healthService.checkHealth();
  }

  async ping(): Promise<boolean> {
    return this.healthService.ping();
  }
}
