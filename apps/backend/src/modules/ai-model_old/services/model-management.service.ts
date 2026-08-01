import { Injectable, Inject } from '@nestjs/common';
import { AIModel } from '../domain/ai-model';
import { AIModelRepository, AI_MODEL_REPOSITORY } from '../repositories/ai-model.repository';

@Injectable()
export class ModelManagementService {
  constructor(
    @Inject(AI_MODEL_REPOSITORY) private readonly aiModelRepo: AIModelRepository
  ) {}

  async createModel(model: AIModel): Promise<void> {
    await this.aiModelRepo.save(model);
  }

  async updateModel(model: AIModel): Promise<void> {
    await this.aiModelRepo.save(model);
  }

  async deleteModel(id: string): Promise<void> {
    await this.aiModelRepo.delete(id);
  }
}
