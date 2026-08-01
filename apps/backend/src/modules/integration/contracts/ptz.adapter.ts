import { PtzCommand } from '../models/ptz-command';

export interface PtzAdapter {
  move(command: PtzCommand): Promise<void>;
  stop(cameraId: string): Promise<void>;
  gotoPreset(cameraId: string, presetId: string): Promise<void>;
  listPresets(cameraId: string): Promise<string[]>;
}
