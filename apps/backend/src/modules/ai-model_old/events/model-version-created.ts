import { ModelVersion } from '../domain/model-version';

export class ModelVersionCreatedEvent {
  constructor(
    public readonly version: ModelVersion,
    public readonly timestamp: Date = new Date()
  ) {}
}
