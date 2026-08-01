import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ICameraGroupRepository } from '../../../../modules/vision/domain/repositories/camera-group.repository';
import { CameraGroup } from '../../../../modules/vision/domain/entities/camera-group';
import { VisionMapper, RawCameraGroupRecord } from './vision.mapper';

@Injectable()
export class PrismaCameraGroupRepository implements ICameraGroupRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get delegate() {
    return this.prisma.getDelegate<RawCameraGroupRecord>('cameraGroup');
  }

  async save(group: CameraGroup): Promise<void> {
    await this.delegate.upsert({
      where: { id: group.id },
      create: { id: group.id, organizationId: group.organizationId, name: group.name, description: group.description },
      update: { name: group.name, description: group.description },
    });
  }

  async findById(id: string): Promise<CameraGroup | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    if (!raw) return null;
    return VisionMapper.cameraGroupToDomain(raw);
  }

  async findByOrgId(organizationId: string): Promise<CameraGroup[]> {
    const list = await this.delegate.findMany({ where: { organizationId } });
    return list.map((r) => VisionMapper.cameraGroupToDomain(r));
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }
}
