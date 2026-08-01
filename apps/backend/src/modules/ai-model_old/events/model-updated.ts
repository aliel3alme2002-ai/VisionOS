import { AIModel } from '../domain/ai-model';

export class ModelUpdatedEvent {
  constructor(
    public readonly model: AIModel,
    public readonly timestamp: Date = new Date()
  ) {}
}
