import { AIModel } from '../domain/ai-model';

export class ModelCreatedEvent {
  constructor(
    public readonly model: AIModel,
    public readonly timestamp: Date = new Date()
  ) {}
}
