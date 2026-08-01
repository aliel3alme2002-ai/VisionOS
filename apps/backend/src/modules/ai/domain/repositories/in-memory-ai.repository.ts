import { Injectable } from '@nestjs/common';
import { IAiModelRepository } from './ai-model.repository';
import { IDeploymentRepository } from './deployment.repository';
import { IPipelineRepository } from './pipeline.repository';
import { IRuntimeRepository } from './runtime.repository';

import { AiModel } from '../entities/ai-model';
import { Deployment } from '../entities/deployment';
import { Pipeline } from '../entities/pipeline';
import { Runtime } from '../entities/runtime';

@Injectable()
export class InMemoryAiModelRepository implements IAiModelRepository {
  private readonly storage = new Map<string, AiModel>();

  async save(model: AiModel): Promise<void> { this.storage.set(model.id, model); }
  async findById(id: string): Promise<AiModel | null> { return this.storage.get(id) ?? null; }
  async findByOrgId(organizationId: string): Promise<AiModel[]> {
    return Array.from(this.storage.values()).filter((m) => m.organizationId === organizationId);
  }
}

@Injectable()
export class InMemoryDeploymentRepository implements IDeploymentRepository {
  private readonly storage = new Map<string, Deployment>();

  async save(deployment: Deployment): Promise<void> { this.storage.set(deployment.id, deployment); }
  async findById(id: string): Promise<Deployment | null> { return this.storage.get(id) ?? null; }
  async findByRuntimeId(runtimeId: string): Promise<Deployment[]> {
    return Array.from(this.storage.values()).filter((d) => d.runtimeId === runtimeId);
  }
}

@Injectable()
export class InMemoryPipelineRepository implements IPipelineRepository {
  private readonly storage = new Map<string, Pipeline>();

  async save(pipeline: Pipeline): Promise<void> { this.storage.set(pipeline.id, pipeline); }
  async findById(id: string): Promise<Pipeline | null> { return this.storage.get(id) ?? null; }
  async findByOrgId(organizationId: string): Promise<Pipeline[]> {
    return Array.from(this.storage.values()).filter((p) => p.organizationId === organizationId);
  }
}

@Injectable()
export class InMemoryRuntimeRepository implements IRuntimeRepository {
  private readonly storage = new Map<string, Runtime>();

  async save(runtime: Runtime): Promise<void> { this.storage.set(runtime.id, runtime); }
  async findById(id: string): Promise<Runtime | null> { return this.storage.get(id) ?? null; }
  async findByEdgeNodeId(edgeNodeId: string): Promise<Runtime[]> {
    return Array.from(this.storage.values()).filter((r) => r.edgeNodeId === edgeNodeId);
  }
  async findAll(): Promise<Runtime[]> { return Array.from(this.storage.values()); }
}
