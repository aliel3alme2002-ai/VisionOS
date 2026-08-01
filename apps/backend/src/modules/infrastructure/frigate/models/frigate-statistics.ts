export interface FrigateStatistics {
  processedEvents: number;
  failedEvents: number;
  droppedEvents: number;
  duplicateEvents: number;
  averageLatency: number;
  averageProcessingTime: number;
  connectedSince?: Date;
}
