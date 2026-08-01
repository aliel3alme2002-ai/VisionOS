import { Runtime } from '../entities/runtime';

export interface IRuntimeRepository {
  save(runtime: Runtime): Promise<void>;
  findById(id: string): Promise<Runtime | null>;
  findByEdgeNodeId(edgeNodeId: string): Promise<Runtime[]>;
  findAll(): Promise<Runtime[]>;
}
