import { PTZProfile } from '../domain/ptz-profile';

export interface PTZProvider {
  move(profile: PTZProfile): Promise<boolean>;
  stop(cameraId: string): Promise<boolean>;
}

export const PTZ_PROVIDER = Symbol('PTZ_PROVIDER');
