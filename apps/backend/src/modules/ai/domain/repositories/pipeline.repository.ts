import { Pipeline } from '../entities/pipeline';

export interface IPipelineRepository {
  save(pipeline: Pipeline): Promise<void>;
  findById(id: string): Promise<Pipeline | null>;
  findByOrgId(organizationId: string): Promise<Pipeline[]>;
}
