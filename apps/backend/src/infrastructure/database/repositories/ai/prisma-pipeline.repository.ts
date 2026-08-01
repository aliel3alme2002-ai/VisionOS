import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IPipelineRepository } from '../../../../modules/ai/domain/repositories/pipeline.repository';
import { Pipeline } from '../../../../modules/ai/domain/entities/pipeline';
import { AiMapper, RawPipelineRecord } from './ai.mapper';

@Injectable()
export class PrismaPipelineRepository implements IPipelineRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get delegate() {
    return this.prisma.getDelegate<RawPipelineRecord>('pipeline');
  }

  async save(pipeline: Pipeline): Promise<void> {
    await this.delegate.upsert({
      where: { id: pipeline.id },
      create: { id: pipeline.id, organizationId: pipeline.organizationId, name: pipeline.name, description: pipeline.description, runtimeId: pipeline.runtimeId },
      update: { name: pipeline.name, description: pipeline.description },
    });
  }

  async findById(id: string): Promise<Pipeline | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    if (!raw) return null;
    return AiMapper.pipelineToDomain(raw);
  }

  async findByOrgId(organizationId: string): Promise<Pipeline[]> {
    const list = await this.delegate.findMany({ where: { organizationId } });
    return list.map((r: RawPipelineRecord) => AiMapper.pipelineToDomain(r));
  }
}
