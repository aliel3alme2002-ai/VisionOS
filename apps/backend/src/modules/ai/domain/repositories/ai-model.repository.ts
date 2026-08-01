import { AiModel } from '../entities/ai-model';

export interface IAiModelRepository {
  save(model: AiModel): Promise<void>;
  findById(id: string): Promise<AiModel | null>;
  findByOrgId(organizationId: string): Promise<AiModel[]>;
}
