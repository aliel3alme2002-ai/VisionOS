import { Injectable, Inject } from '@nestjs/common';
import { AIModelRepository, AI_MODEL_REPOSITORY } from '../repositories/ai-model.repository';
import { AIProvider, AI_PROVIDER } from '../providers/ai.provider';

@Injectable()
export class ModelAssignmentService {
  constructor(
    // @ts-ignore
    @Inject(AI_MODEL_REPOSITORY) private readonly aiModelRepo: AIModelRepository,
    @Inject(AI_PROVIDER) private readonly aiProvider: AIProvider
  ) {}

  async assignModelToEdge(modelId: string, edgeId: string): Promise<void> {
    await this.aiProvider.deployModel(modelId, edgeId);
  }
}
