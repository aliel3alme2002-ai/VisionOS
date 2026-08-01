import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IRuleRepository } from '../../../../modules/intelligence/domain/repositories/rule.repository';
import { Rule } from '../../../../modules/intelligence/domain/entities/rule';
import { IntelligenceMapper, RawIntelligenceRuleRecord } from './intelligence.mapper';

@Injectable()
export class PrismaRuleRepository implements IRuleRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get delegate() {
    return this.prisma.getDelegate<RawIntelligenceRuleRecord>('intelligenceRule');
  }

  async save(rule: Rule): Promise<void> {
    await this.delegate.upsert({
      where: { id: rule.id },
      create: { id: rule.id, organizationId: rule.organizationId, name: rule.name, enabled: rule.enabled, priority: rule.priority },
      update: { name: rule.name, enabled: rule.enabled, priority: rule.priority },
    });
  }

  async findById(id: string): Promise<Rule | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    if (!raw) return null;
    return IntelligenceMapper.ruleToDomain(raw);
  }

  async findByOrgId(organizationId: string): Promise<Rule[]> {
    const list = await this.delegate.findMany({ where: { organizationId } });
    return list.map((r: RawIntelligenceRuleRecord) => IntelligenceMapper.ruleToDomain(r));
  }

  async findActiveByOrgId(organizationId: string): Promise<Rule[]> {
    const list = await this.delegate.findMany({ where: { organizationId, enabled: true } });
    return list.map((r: RawIntelligenceRuleRecord) => IntelligenceMapper.ruleToDomain(r));
  }
}
