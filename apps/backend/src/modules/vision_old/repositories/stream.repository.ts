import { Stream } from '../domain/stream';

export interface StreamRepository {
  findById(id: string): Promise<Stream | null>;
  findByCamera(cameraId: string): Promise<Stream[]>;
  save(stream: Stream): Promise<void>;
  delete(id: string): Promise<void>;
}

export const STREAM_REPOSITORY = Symbol('STREAM_REPOSITORY');
