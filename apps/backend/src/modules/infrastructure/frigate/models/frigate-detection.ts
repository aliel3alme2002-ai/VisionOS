import { FrigateObjectType } from './frigate-object';

export interface FrigateDetection {
  label: FrigateObjectType;
  score: number;
  box: [number, number, number, number];
  area: number;
  region: [number, number, number, number];
}
