import { Injectable } from '@nestjs/common';
import { Track } from './track';
import { KalmanFilter } from '../prediction/kalman-filter';
import { DetectionResult } from '../../runtime-execution/result/models/detection-result';

@Injectable()
export class TrackManager {
  private readonly activeTracksMap: Map<string, Track> = new Map();
  private trackCounter = 0;
  private removedCount = 0;

  constructor(private readonly kalman: KalmanFilter) {}

  public createTrack(detection: DetectionResult): Track {
    this.trackCounter++;
    const trackId = `TRK-${this.trackCounter}`;
    const track = new Track(trackId, detection, this.kalman);
    this.activeTracksMap.set(trackId, track);
    return track;
  }

  public getActiveTracks(): Track[] {
    return Array.from(this.activeTracksMap.values()).filter((t) => t.state !== 'REMOVED');
  }

  public cleanupDeadTracks(maxMisses = 30): void {
    for (const [id, track] of this.activeTracksMap.entries()) {
      if (track.misses > maxMisses) {
        track.markRemoved();
        this.activeTracksMap.delete(id);
        this.removedCount++;
      }
    }
  }

  public getRemovedCount(): number {
    return this.removedCount;
  }
}
