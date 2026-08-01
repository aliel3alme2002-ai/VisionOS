import { ModelMetadata } from '../models/model-metadata';

export interface ModelProvider {
  readonly providerName: string;
  fetchMetadata(modelId: string): Promise<ModelMetadata | null>;
  listAvailableModels(): Promise<ModelMetadata[]>;
  resolveDownloadUrl(modelId: string): Promise<string | null>;
}
