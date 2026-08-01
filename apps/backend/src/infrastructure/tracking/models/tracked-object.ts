import { TrackState } from '../tracker/track-state';
import { DetectionBox } from '../../runtime-execution/result/models/detection-box';
import { TrajectoryPoint } from '../history/trajectory';

export interface TrackedObjectProps {
  trackId: string;
  classId: number;
  className: string;
  confidence: number;
  boundingBox: DetectionBox;
  velocity: { vx: number; vy: number; speed: number };
  direction: number; // angle in degrees 0-360
  age: number;
  hits: number;
  misses: number;
  trajectory: TrajectoryPoint[];
  firstSeen: Date;
  lastSeen: Date;
  state: TrackState;
}

export class TrackedObject implements TrackedObjectProps {
  public readonly trackId: string;
  public readonly classId: number;
  public readonly className: string;
  public readonly confidence: number;
  public readonly boundingBox: DetectionBox;
  public readonly velocity: { vx: number; vy: number; speed: number };
  public readonly direction: number;
  public readonly age: number;
  public readonly hits: number;
  public readonly misses: number;
  public readonly trajectory: TrajectoryPoint[];
  public readonly firstSeen: Date;
  public readonly lastSeen: Date;
  public readonly state: TrackState;

  constructor(props: TrackedObjectProps) {
    this.trackId = props.trackId;
    this.classId = props.classId;
    this.className = props.className;
    this.confidence = props.confidence;
    this.boundingBox = props.boundingBox;
    this.velocity = props.velocity;
    this.direction = props.direction;
    this.age = props.age;
    this.hits = props.hits;
    this.misses = props.misses;
    this.trajectory = props.trajectory;
    this.firstSeen = props.firstSeen;
    this.lastSeen = props.lastSeen;
    this.state = props.state;
  }
}
