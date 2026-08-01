import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IDeploymentRepository } from '../../../../modules/ai/domain/repositories/deployment.repository';
import { Deployment } from '../../../../modules/ai/domain/entities/deployment';
import { AiMapper, RawDeploymentRecord } from './ai.mapper';

@Injectable()
export class PrismaDeploymentRepository implements IDeploymentRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get delegate() {
    return this.prisma.getDelegate<RawDeploymentRecord>('deployment');
  }

  async save(deployment: Deployment): Promise<void> {
    const data = AiMapper.deploymentToPrisma(deployment);
    await this.delegate.upsert({
      where: { id: deployment.id },
      create: data,
      update: data,
    });
  }

  async findById(id: string): Promise<Deployment | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    if (!raw) return null;
    return AiMapper.deploymentToDomain(raw);
  }

  async findByRuntimeId(runtimeId: string): Promise<Deployment[]> {
    const list = await this.delegate.findMany({ where: { runtimeId } });
    return list.map((r: RawDeploymentRecord) => AiMapper.deploymentToDomain(r));
  }
}
