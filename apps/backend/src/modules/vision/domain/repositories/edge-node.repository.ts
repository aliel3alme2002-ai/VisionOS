import { EdgeNode } from '../entities/edge-node';

export interface IEdgeNodeRepository {
  save(node: EdgeNode): Promise<void>;
  findById(id: string, includeDeleted?: boolean): Promise<EdgeNode | null>;
  findByOrgId(organizationId: string, includeDeleted?: boolean): Promise<EdgeNode[]>;
}
