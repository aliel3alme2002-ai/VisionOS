import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IZoneRepository } from '../../../../modules/intelligence/domain/repositories/zone.repository';
import { Zone } from '../../../../modules/intelligence/domain/entities/zone';
import { IntelligenceMapper, RawVisionZoneRecord } from './intelligence.mapper';

@Injectable()
export class PrismaZoneRepository implements IZoneRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get delegate() {
    return this.prisma.getDelegate<RawVisionZoneRecord>('visionZone');
  }

  async save(zone: Zone): Promise<void> {
    await this.delegate.upsert({
      where: { id: zone.id },
      create: { id: zone.id, organizationId: zone.organizationId, cameraId: zone.cameraId, name: zone.name, polygon: zone.polygon, type: zone.type.getValue() },
      update: { name: zone.name, polygon: zone.polygon, type: zone.type.getValue() },
    });
  }

  async findById(id: string): Promise<Zone | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    if (!raw) return null;
    return IntelligenceMapper.zoneToDomain(raw);
  }

  async findByCameraId(cameraId: string): Promise<Zone[]> {
    const list = await this.delegate.findMany({ where: { cameraId } });
    return list.map((r: RawVisionZoneRecord) => IntelligenceMapper.zoneToDomain(r));
  }
}
