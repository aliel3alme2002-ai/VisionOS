import { Module } from '@nestjs/common';
import { GeometryUtils } from './utilities/geometry';
import { DistanceUtils } from './utilities/distance';
import { Trajectory } from './history/trajectory';
import { TrackHistory } from './history/track-history';
import { MotionModel } from './prediction/motion-model';
import { KalmanFilter } from './prediction/kalman-filter';
import { CostMatrixBuilder } from './association/cost-matrix';
import { HungarianMatcher } from './association/hungarian-matcher';
import { IouMatcher } from './association/iou-matcher';
import { TrackManager } from './tracker/track-manager';
import { ByteTrack } from './tracker/byte-track';

@Module({
  providers: [
    GeometryUtils,
    DistanceUtils,
    Trajectory,
    TrackHistory,
    MotionModel,
    KalmanFilter,
    CostMatrixBuilder,
    HungarianMatcher,
    IouMatcher,
    TrackManager,
    ByteTrack,
  ],
  exports: [
    ByteTrack,
    TrackManager,
    KalmanFilter,
    IouMatcher,
    TrackHistory,
  ],
})
export class TrackingModule {}
