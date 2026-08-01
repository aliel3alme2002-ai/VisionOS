import { TrackedObject } from '../entities/tracked-object';

export interface ITrackedObjectRepository {
  save(object: TrackedObject): Promise<void>;
  findByTrackingId(trackingId: string): Promise<TrackedObject | null>;
  findAllActive(): Promise<TrackedObject[]>;
}
