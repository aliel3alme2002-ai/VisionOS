import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IEdgeNodeRepository } from '../../../../modules/vision/domain/repositories/edge-node.repository';
import { EdgeNode } from '../../../../modules/vision/domain/entities/edge-node';
import { VisionMapper, RawEdgeNodeRecord } from './vision.mapper';

@Injectable()
export class PrismaEdgeNodeRepository implements IEdgeNodeRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get delegate() {
    return this.prisma.getDelegate<RawEdgeNodeRecord>('edgeNode');
  }

  async save(node: EdgeNode): Promise<void> {
    const data = VisionMapper.edgeNodeToPrisma(node);
    await this.delegate.upsert({
      where: { id: node.id },
      create: data,
      update: data,
    });
  }

  async findById(id: string, includeDeleted = false): Promise<EdgeNode | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    if (!raw) return null;
    const node = VisionMapper.edgeNodeToDomain(raw);
    if (!includeDeleted && node.isDeleted()) return null;
    return node;
  }

  async findByOrgId(organizationId: string, includeDeleted = false): Promise<EdgeNode[]> {
    const list = await this.delegate.findMany({ where: { organizationId } });
    return list
      .map((r: RawEdgeNodeRecord) => VisionMapper.edgeNodeToDomain(r))
      .filter((n: EdgeNode) => includeDeleted || !n.isDeleted());
  }
}
