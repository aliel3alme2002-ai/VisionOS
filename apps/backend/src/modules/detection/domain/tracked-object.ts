export interface TrackedObject {
  trackId: string;
  label: string;
  firstSeen: Date;
  lastSeen: Date;
  confidence: number;
  trajectory: { x: number; y: number }[];
}
