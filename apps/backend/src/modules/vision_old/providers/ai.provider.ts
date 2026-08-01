export interface AIProvider {
  deployModel(modelId: string, edgeId: string): Promise<boolean>;
  removeModel(modelId: string, edgeId: string): Promise<boolean>;
  getModelStatus(modelId: string, edgeId: string): Promise<string>;
}

export const AI_PROVIDER = Symbol('AI_PROVIDER');
