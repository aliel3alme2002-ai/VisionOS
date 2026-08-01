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
import { InferenceService } from '../inference/inference.service';

@Injectable()
export class FrigateAdapter implements 
  InferenceAdapter, 
  HealthAdapter, 
  ConfigurationAdapter, 
  ConnectionAdapter {

  constructor(
    private readonly connectionService: ConnectionService,
    private readonly configurationService: ConfigurationService,
    private readonly healthService: HealthService,
    private readonly inferenceService: InferenceService
  ) {}

  async connect(target: string): Promise<boolean> {
    if (!target) return false;
    return this.connectionService.connect();
  }

  async disconnect(target: string): Promise<void> {
    if (!target) return;
    await this.connectionService.disconnect();
  }

  async reconnect(target: string): Promise<boolean> {
    if (!target) return false;
    return this.connectionService.reconnect();
  }

  async loadModel(modelId: string): Promise<void> {
    if (!modelId) return;
  }

  async unloadModel(modelId: string): Promise<void> {
    if (!modelId) return;
  }

  async runInference(request: InferenceRequest): Promise<InferenceResponse> {
    return this.inferenceService.runInference(request);
  }

  async loadConfiguration(deviceId: string): Promise<Record<string, unknown>> {
    return this.configurationService.loadConfiguration(deviceId);
  }

  async saveConfiguration(deviceId: string, config: Record<string, unknown>): Promise<void> {
    await this.configurationService.saveConfiguration(deviceId, config);
  }

  async health(): Promise<AdapterHealth> {
    return this.healthService.checkHealth();
  }

  async ping(): Promise<boolean> {
    return this.healthService.ping();
  }
}
