import { StreamProfile } from '../entities/stream-profile';

export interface IStreamProfileRepository {
  save(profile: StreamProfile): Promise<void>;
  findById(id: string): Promise<StreamProfile | null>;
  findAll(): Promise<StreamProfile[]>;
}
