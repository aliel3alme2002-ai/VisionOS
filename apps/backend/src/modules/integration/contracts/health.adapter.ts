import { AdapterHealth } from '../models/adapter-health';

export interface HealthAdapter {
  health(): Promise<AdapterHealth>;
  ping(): Promise<boolean>;
}
