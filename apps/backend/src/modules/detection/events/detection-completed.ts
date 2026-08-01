import { DetectionJob } from '../domain/detection-job';

export class DetectionCompletedEvent {
  constructor(
    public readonly job: DetectionJob,
    public readonly timestamp: Date = new Date()
  ) {}
}
