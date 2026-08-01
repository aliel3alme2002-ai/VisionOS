import { ModelMetadata } from '../models/model-metadata';

export interface ModelManifest {
  manifestVersion: string;
  registeredAt: Date;
  metadata: ModelMetadata;
  storagePath?: string | undefined;
  isBuiltin: boolean;
  status: 'REGISTERED' | 'DOWNLOADING' | 'READY' | 'ERROR';
}
