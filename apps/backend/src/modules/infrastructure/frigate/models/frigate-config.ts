import { FrigateCamera } from './frigate-camera';

export interface FrigateConfig {
  mqttHost: string;
  mqttPort: number;
  cameras: Record<string, FrigateCamera>;
  detectors: Record<string, unknown>;
}
