import { AIModel } from '../domain/ai-model';

export interface AIModelRepository {
  findById(id: string): Promise<AIModel | null>;
  findAll(): Promise<AIModel[]>;
  save(model: AIModel): Promise<void>;
  delete(id: string): Promise<void>;
}

export const AI_MODEL_REPOSITORY = Symbol('AI_MODEL_REPOSITORY');
