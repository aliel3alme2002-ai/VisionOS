import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IAiModelRepository } from '../../../../modules/ai/domain/repositories/ai-model.repository';
import { AiModel } from '../../../../modules/ai/domain/entities/ai-model';
import { AiMapper, RawAiModelRecord } from './ai.mapper';

@Injectable()
export class PrismaAiModelRepository implements IAiModelRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get delegate() {
    return this.prisma.getDelegate<RawAiModelRecord>('aiModel');
  }

  async save(model: AiModel): Promise<void> {
    const data = AiMapper.modelToPrisma(model);
    await this.delegate.upsert({
      where: { id: model.id },
      create: data,
      update: data,
    });
  }

  async findById(id: string): Promise<AiModel | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    if (!raw) return null;
    return AiMapper.modelToDomain(raw);
  }

  async findByOrgId(organizationId: string): Promise<AiModel[]> {
    const list = await this.delegate.findMany({ where: { organizationId } });
    return list.map((r: RawAiModelRecord) => AiMapper.modelToDomain(r));
  }
}
