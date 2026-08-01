import { TrackedObject } from '../domain/tracked-object';

export class TrackingStartedEvent {
  constructor(
    public readonly trackedObject: TrackedObject,
    public readonly timestamp: Date = new Date()
  ) {}
}
