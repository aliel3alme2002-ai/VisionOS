import { TrackState } from './track-state';
import { KalmanFilter, KalmanState } from '../prediction/kalman-filter';
import { DetectionBox } from '../../runtime-execution/result/models/detection-box';
import { DetectionResult } from '../../runtime-execution/result/models/detection-result';
import { Trajectory } from '../history/trajectory';
import { DistanceUtils } from '../utilities/distance';
import { TrackedObject } from '../models/tracked-object';

export class Track {
  public readonly trackId: string;
  public classId: number;
  public className: string;
  public confidence: number;
  public boundingBox: DetectionBox;
  public kalmanState: KalmanState;
  public state: TrackState = 'NEW';
  public age = 1;
  public hits = 1;
  public misses = 0;
  public readonly firstSeen: Date;
  public lastSeen: Date;
  public readonly trajectory: Trajectory;

  constructor(
    trackId: string,
    detection: DetectionResult,
    private readonly kalman: KalmanFilter,
  ) {
    this.trackId = trackId;
    this.classId = detection.classId;
    this.className = detection.className;
    this.confidence = detection.confidence;
    this.boundingBox = detection.boundingBox;

    const cx = detection.boundingBox.xPixel + detection.boundingBox.widthPixel / 2;
    const cy = detection.boundingBox.yPixel + detection.boundingBox.heightPixel / 2;

    this.kalmanState = this.kalman.initiateState(
      cx,
      cy,
      detection.boundingBox.widthPixel,
      detection.boundingBox.heightPixel,
    );

    this.firstSeen = new Date();
    this.lastSeen = new Date();
    this.trajectory = new Trajectory();
    this.trajectory.addPoint(cx, cy, detection.timestamp);
  }

  public predict(dtMs = 33): void {
    this.kalmanState = this.kalman.predict(this.kalmanState, dtMs);
    this.age++;
    if (this.state !== 'NEW') {
      this.misses++;
    }
  }

  public update(detection: DetectionResult, dtMs = 33): void {
    this.hits++;
    this.misses = 0;
    this.confidence = detection.confidence;
    this.boundingBox = detection.boundingBox;
    this.lastSeen = new Date();

    const cx = detection.boundingBox.xPixel + detection.boundingBox.widthPixel / 2;
    const cy = detection.boundingBox.yPixel + detection.boundingBox.heightPixel / 2;

    this.kalmanState = this.kalman.update(
      this.kalmanState,
      cx,
      cy,
      detection.boundingBox.widthPixel,
      detection.boundingBox.heightPixel,
      dtMs,
    );

    this.trajectory.addPoint(cx, cy, detection.timestamp);

    if (this.state === 'NEW' && this.hits >= 2) {
      this.state = 'TRACKED';
    } else if (this.state === 'LOST') {
      this.state = 'TRACKED';
    }
  }

  public markLost(): void {
    if (this.state === 'TRACKED') {
      this.state = 'LOST';
    }
  }

  public markRemoved(): void {
    this.state = 'REMOVED';
  }

  public toTrackedObject(): TrackedObject {
    const vx = this.kalmanState.vx;
    const vy = this.kalmanState.vy;
    const speed = Math.sqrt(vx * vx + vy * vy);
    const direction = DistanceUtils.calculateDirection(vx, vy);

    return new TrackedObject({
      trackId: this.trackId,
      classId: this.classId,
      className: this.className,
      confidence: this.confidence,
      boundingBox: this.boundingBox,
      velocity: { vx, vy, speed },
      direction,
      age: this.age,
      hits: this.hits,
      misses: this.misses,
      trajectory: this.trajectory.getPoints(),
      firstSeen: this.firstSeen,
      lastSeen: this.lastSeen,
      state: this.state,
    });
  }
}
