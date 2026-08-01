export interface RecordingSegment {
  id: string;
  recordingId: string;
  sequence: number;
  startTime: Date;
  endTime: Date;
  duration: number;
}
