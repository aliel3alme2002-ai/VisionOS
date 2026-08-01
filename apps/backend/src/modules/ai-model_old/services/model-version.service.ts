import { Injectable, Inject } from '@nestjs/common';
import { ModelVersion } from '../domain/model-version';
import { AIModelRepository, AI_MODEL_REPOSITORY } from '../repositories/ai-model.repository';
import { ModelRegistryProvider, MODEL_REGISTRY_PROVIDER } from '../providers/model-registry.provider';

@Injectable()
export class ModelVersionService {
  constructor(
    @Inject(AI_MODEL_REPOSITORY) private readonly aiModelRepo: AIModelRepository,
    @Inject(MODEL_REGISTRY_PROVIDER) private readonly registryProvider: ModelRegistryProvider
  ) {}

  async addVersion(version: ModelVersion): Promise<void> {
    await this.aiModelRepo.saveVersion(version);
  }

  async downloadVersion(versionId: string): Promise<string> {
    const version: ModelVersion | null = await this.aiModelRepo.getVersion(versionId);
    if (!version) throw new Error('Version not found');
    return this.registryProvider.downloadModel(version.id);
  }
}
