import { DetectionJob } from '../domain/detection-job';

export class DetectionStartedEvent {
  constructor(
    public readonly job: DetectionJob,
    public readonly timestamp: Date = new Date()
  ) {}
}
