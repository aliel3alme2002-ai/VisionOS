import { Injectable } from '@nestjs/common';
import { ModelProvider } from './model-provider';
import { ModelMetadata } from '../models/model-metadata';
import { BUILTIN_MODELS } from '../catalog/builtin-models';

@Injectable()
export class UltralyticsProvider implements ModelProvider {
  public readonly providerName = 'Ultralytics';

  public async fetchMetadata(modelId: string): Promise<ModelMetadata | null> {
    const found = BUILTIN_MODELS.find((m) => m.publisher === 'Ultralytics' && m.id === modelId);
    return found ?? null;
  }

  public async listAvailableModels(): Promise<ModelMetadata[]> {
    return BUILTIN_MODELS.filter((m) => m.publisher === 'Ultralytics');
  }

  public async resolveDownloadUrl(modelId: string): Promise<string | null> {
    const found = await this.fetchMetadata(modelId);
    return found?.downloadUrl ?? null;
  }
}
