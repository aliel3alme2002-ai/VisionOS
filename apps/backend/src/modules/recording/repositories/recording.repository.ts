import { Recording } from '../domain/recording';

export interface RecordingRepository {
  findById(id: string): Promise<Recording | null>;
  save(recording: Recording): Promise<void>;
  updateStatus(id: string, status: string): Promise<void>;
  findExpiredRecordings(date: Date): Promise<Recording[]>;
}

export const RECORDING_REPOSITORY = Symbol('RECORDING_REPOSITORY');
