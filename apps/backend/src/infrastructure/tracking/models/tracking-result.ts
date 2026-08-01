import { TrackedObject } from './tracked-object';
import { TrackingStatistics } from './tracking-statistics';

export interface TrackingResultProps {
  frameId: string;
  timestamp: number;
  trackedObjects: TrackedObject[];
  statistics: TrackingStatistics;
}

export class TrackingResult implements TrackingResultProps {
  public readonly frameId: string;
  public readonly timestamp: number;
  public readonly trackedObjects: TrackedObject[];
  public readonly statistics: TrackingStatistics;

  constructor(props: TrackingResultProps) {
    this.frameId = props.frameId;
    this.timestamp = props.timestamp;
    this.trackedObjects = props.trackedObjects;
    this.statistics = props.statistics;
  }
}
