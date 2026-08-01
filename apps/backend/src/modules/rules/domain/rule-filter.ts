export interface RuleFilter {
  minimumConfidence?: number;
  cameraIds?: string[];
  zoneIds?: string[];
  modelIds?: string[];
  detectionTypes?: string[];
  timeRange?: { start: string; end: string };
}
