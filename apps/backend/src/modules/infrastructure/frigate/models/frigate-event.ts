import { FrigateObjectType } from './frigate-object';

export interface FrigateEvent {
  eventId: string;
  cameraId: string;
  objectId: string;
  label: FrigateObjectType;
  score: number;
  zone: string;
  enteredZones: string[];
  leftZones: string[];
  startTime: number;
  endTime?: number;
  snapshotId?: string;
  clipId?: string;
  metadata: Record<string, unknown>;
}
