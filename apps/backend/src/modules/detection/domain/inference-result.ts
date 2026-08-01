import { BoundingBox } from './bounding-box';

export interface InferenceResult {
  objects: BoundingBox[];
  latency: number;
  runtime: string;
  modelVersion: string;
}
