import { Injectable } from '@nestjs/common';
import { TrackManager } from './track-manager';
import { IouMatcher } from '../association/iou-matcher';
import { DetectionResult } from '../../runtime-execution/result/models/detection-result';
import { TrackingResult } from '../models/tracking-result';
import { TrackingStatistics } from '../models/tracking-statistics';

export interface ByteTrackOptions {
  highThreshold?: number | undefined; // High detection confidence threshold
  lowThreshold?: number | undefined;  // Low detection confidence threshold
  matchThreshold?: number | undefined;// IoU matching threshold
  maxMisses?: number | undefined;     // Max misses before track removal
}

@Injectable()
export class ByteTrack {
  constructor(
    private readonly trackManager: TrackManager,
    private readonly iouMatcher: IouMatcher,
  ) {}

  public track(
    detections: DetectionResult[],
    frameId = 'frame-0',
    timestamp = Date.now(),
    options?: ByteTrackOptions,
  ): TrackingResult {
    const startTime = Date.now();
    const highThresh = options?.highThreshold ?? 0.5;
    const lowThresh = options?.lowThreshold ?? 0.1;
    const matchThresh = options?.matchThreshold ?? 0.45;
    const maxMisses = options?.maxMisses ?? 30;

    // 1. Separate detections into high-score and low-score boxes
    const highDetections: DetectionResult[] = [];
    const lowDetections: DetectionResult[] = [];

    for (const d of detections) {
      if (d.confidence >= highThresh) {
        highDetections.push(d);
      } else if (d.confidence >= lowThresh) {
        lowDetections.push(d);
      }
    }
    console.debug(`[ByteTrack] Input Detections: ${detections.length}, High: ${highDetections.length}, Low: ${lowDetections.length}`);

    // 2. Predict positions for active tracks using Kalman Filter
    const activeTracks = this.trackManager.getActiveTracks();
    for (const track of activeTracks) {
      track.predict();
    }

    // 3. First Association: Match High Confidence Detections with Active Tracks
    const trackBoxes = activeTracks.map((t) => t.boundingBox);
    const highBoxes = highDetections.map((d) => d.boundingBox);
    const firstMatch = this.iouMatcher.matchBoxes(trackBoxes, highBoxes, matchThresh);

    for (const [trackIdx, detIdx] of firstMatch.matches) {
      const track = activeTracks[trackIdx];
      const det = highDetections[detIdx];
      if (track && det) {
        track.update(det);
      }
    }

    // 4. Second Association: Match Unmatched Active Tracks with Low Confidence Detections
    const unmatchedTracksFirst = firstMatch.unmatchedTracks.map((idx) => activeTracks[idx]).filter((t): t is typeof activeTracks[0] => t !== undefined);
    const unmatchedTrackBoxes = unmatchedTracksFirst.map((t) => t.boundingBox);
    const lowBoxes = lowDetections.map((d) => d.boundingBox);

    const secondMatch = this.iouMatcher.matchBoxes(unmatchedTrackBoxes, lowBoxes, 0.3);

    for (const [uTrackIdx, detIdx] of secondMatch.matches) {
      const track = unmatchedTracksFirst[uTrackIdx];
      const det = lowDetections[detIdx];
      if (track && det) {
        track.update(det);
      }
    }

    // Mark remaining unmatched tracks as LOST
    const remainingUnmatchedTracks = secondMatch.unmatchedTracks.map((idx) => unmatchedTracksFirst[idx]).filter((t): t is typeof unmatchedTracksFirst[0] => t !== undefined);
    for (const track of remainingUnmatchedTracks) {
      track.markLost();
    }

    // 5. Initialize New Tracks for Unmatched High Confidence Detections
    const unmatchedHighDetections = firstMatch.unmatchedDetections.map((idx) => highDetections[idx]).filter((d): d is typeof highDetections[0] => d !== undefined);
    for (const det of unmatchedHighDetections) {
      const newTrk = this.trackManager.createTrack(det);
      console.debug(`[ByteTrack] Created Track ${newTrk.trackId} for class ${det.className}`);
    }

    // 6. Cleanup Dead Tracks & Collect Active Tracks
    this.trackManager.cleanupDeadTracks(maxMisses);

    const associationTimeMs = Date.now() - startTime;
    const currentActiveTracks = this.trackManager.getActiveTracks();

    const activeCount = currentActiveTracks.filter((t) => t.state === 'TRACKED' || t.state === 'NEW').length;
    const lostCount = currentActiveTracks.filter((t) => t.state === 'LOST').length;
    const removedCount = this.trackManager.getRemovedCount();

    const totalAge = currentActiveTracks.reduce((sum, t) => sum + t.age, 0);
    const avgAge = currentActiveTracks.length > 0 ? totalAge / currentActiveTracks.length : 0;

    const stats = new TrackingStatistics({
      activeTracks: activeCount,
      lostTracks: lostCount,
      removedTracks: removedCount,
      averageTrackAge: avgAge,
      trackingFps: associationTimeMs > 0 ? 1000 / associationTimeMs : 1000,
      associationTimeMs,
    });

    console.debug(`[ByteTrack] Frame ${frameId}: ${activeCount} active, ${lostCount} lost, ${removedCount} removed. Association time: ${associationTimeMs}ms`);

    const trackedObjs = currentActiveTracks.map((t) => t.toTrackedObject());

    return new TrackingResult({
      frameId,
      timestamp,
      trackedObjects: trackedObjs,
      statistics: stats,
    });
  }
}
