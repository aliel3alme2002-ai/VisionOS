import { StreamProfile } from '../domain/stream-profile';

export interface StreamProvider {
  openStream(profile: StreamProfile): Promise<string>;
  closeStream(profileId: string): Promise<boolean>;
}

export const STREAM_PROVIDER = Symbol('STREAM_PROVIDER');
