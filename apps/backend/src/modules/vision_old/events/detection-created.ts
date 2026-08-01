import { Detection } from '../domain/detection';

export class DetectionCreatedEvent {
  constructor(
    public readonly detection: Detection,
    public readonly timestamp: Date = new Date()
  ) {}
}
