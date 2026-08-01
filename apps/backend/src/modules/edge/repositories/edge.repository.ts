import { EdgeNode } from '../domain/edge-node';
import { EdgeResource } from '../domain/edge-resource';
import { EdgeCapabilities } from '../domain/edge-capabilities';

export interface EdgeRepository {
  findById(id: string): Promise<EdgeNode | null>;
  findByOrganization(organizationId: string): Promise<EdgeNode[]>;
  saveNode(node: EdgeNode): Promise<void>;
  deleteNode(id: string): Promise<void>;
  
  saveResource(resource: EdgeResource): Promise<void>;
  getResource(edgeId: string): Promise<EdgeResource | null>;
  
  saveCapabilities(caps: EdgeCapabilities): Promise<void>;
  getCapabilities(edgeId: string): Promise<EdgeCapabilities | null>;
}

export const EDGE_REPOSITORY = Symbol('EDGE_REPOSITORY');
