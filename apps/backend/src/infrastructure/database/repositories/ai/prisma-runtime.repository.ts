import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IRuntimeRepository } from '../../../../modules/ai/domain/repositories/runtime.repository';
import { Runtime } from '../../../../modules/ai/domain/entities/runtime';
import { AiMapper, RawAiRuntimeRecord } from './ai.mapper';

@Injectable()
export class PrismaRuntimeRepository implements IRuntimeRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get delegate() {
    return this.prisma.getDelegate<RawAiRuntimeRecord>('aiRuntime');
  }

  async save(runtime: Runtime): Promise<void> {
    const data = AiMapper.runtimeToPrisma(runtime);
    await this.delegate.upsert({
      where: { id: runtime.id },
      create: data,
      update: data,
    });
  }

  async findById(id: string): Promise<Runtime | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    if (!raw) return null;
    return AiMapper.runtimeToDomain(raw);
  }

  async findByEdgeNodeId(edgeNodeId: string): Promise<Runtime[]> {
    const list = await this.delegate.findMany({ where: { edgeNodeId } });
    return list.map((r: RawAiRuntimeRecord) => AiMapper.runtimeToDomain(r));
  }

  async findAll(): Promise<Runtime[]> {
    const list = await this.delegate.findMany();
    return list.map((r: RawAiRuntimeRecord) => AiMapper.runtimeToDomain(r));
  }
}
