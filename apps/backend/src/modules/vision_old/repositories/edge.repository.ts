import { EdgeNode } from '../domain/edge-node';

export interface EdgeRepository {
  findById(id: string): Promise<EdgeNode | null>;
  findByOrganization(organizationId: string): Promise<EdgeNode[]>;
  save(edgeNode: EdgeNode): Promise<void>;
  delete(id: string): Promise<void>;
}

export const EDGE_REPOSITORY = Symbol('EDGE_REPOSITORY');
