import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ITrackedObjectRepository } from '../../../../modules/intelligence/domain/repositories/tracked-object.repository';
import { TrackedObject } from '../../../../modules/intelligence/domain/entities/tracked-object';
import { IntelligenceMapper, RawTrackedObjectRecord } from './intelligence.mapper';

@Injectable()
export class PrismaTrackedObjectRepository implements ITrackedObjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get delegate() {
    return this.prisma.getDelegate<RawTrackedObjectRecord>('trackedObjectRecord');
  }

  async save(object: TrackedObject): Promise<void> {
    await this.delegate.upsert({
      where: { trackingId: object.trackingId },
      create: { id: object.id, trackingId: object.trackingId, className: object.className, confidence: object.confidence, x: object.bbox.x, y: object.bbox.y, width: object.bbox.width, height: object.bbox.height, firstSeen: object.firstSeen, lastSeen: object.lastSeen },
      update: { x: object.bbox.x, y: object.bbox.y, width: object.bbox.width, height: object.bbox.height, lastSeen: object.lastSeen },
    });
  }

  async findByTrackingId(trackingId: string): Promise<TrackedObject | null> {
    const raw = await this.delegate.findUnique({ where: { trackingId } });
    if (!raw) return null;
    return IntelligenceMapper.trackedObjectToDomain(raw);
  }

  async findAllActive(): Promise<TrackedObject[]> {
    const list = await this.delegate.findMany();
    return list.map((r: RawTrackedObjectRecord) => IntelligenceMapper.trackedObjectToDomain(r));
  }
}
