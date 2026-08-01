import { ModelDeployment } from '../domain/model-deployment';

export class ModelDeployedEvent {
  constructor(
    public readonly deployment: ModelDeployment,
    public readonly timestamp: Date = new Date()
  ) {}
}
