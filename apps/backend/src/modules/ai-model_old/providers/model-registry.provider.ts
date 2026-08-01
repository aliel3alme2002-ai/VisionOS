export interface ModelRegistryProvider {
  downloadModel(versionId: string): Promise<string>;
  uploadModel(filePath: string): Promise<string>;
}

export const MODEL_REGISTRY_PROVIDER = Symbol('MODEL_REGISTRY_PROVIDER');
