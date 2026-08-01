import { AIModel } from '../domain/ai-model';
import { ModelVersion } from '../domain/model-version';

export interface AIModelRepository {
  findById(id: string): Promise<AIModel | null>;
  findByOrganization(organizationId: string): Promise<AIModel[]>;
  save(model: AIModel): Promise<void>;
  delete(id: string): Promise<void>;
  
  saveVersion(version: ModelVersion): Promise<void>;
  getVersion(versionId: string): Promise<ModelVersion | null>;
}

export const AI_MODEL_REPOSITORY = Symbol('AI_MODEL_REPOSITORY');
