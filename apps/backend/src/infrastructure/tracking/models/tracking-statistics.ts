export interface TrackingStatisticsProps {
  activeTracks: number;
  lostTracks: number;
  removedTracks: number;
  averageTrackAge: number;
  trackingFps: number;
  associationTimeMs: number;
}

export class TrackingStatistics implements TrackingStatisticsProps {
  public readonly activeTracks: number;
  public readonly lostTracks: number;
  public readonly removedTracks: number;
  public readonly averageTrackAge: number;
  public readonly trackingFps: number;
  public readonly associationTimeMs: number;

  constructor(props: TrackingStatisticsProps) {
    this.activeTracks = props.activeTracks;
    this.lostTracks = props.lostTracks;
    this.removedTracks = props.removedTracks;
    this.averageTrackAge = props.averageTrackAge;
    this.trackingFps = props.trackingFps;
    this.associationTimeMs = props.associationTimeMs;
  }
}
