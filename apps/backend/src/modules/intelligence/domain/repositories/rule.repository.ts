import { Rule } from '../entities/rule';

export interface IRuleRepository {
  save(rule: Rule): Promise<void>;
  findById(id: string): Promise<Rule | null>;
  findByOrgId(organizationId: string): Promise<Rule[]>;
  findActiveByOrgId(organizationId: string): Promise<Rule[]>;
}
