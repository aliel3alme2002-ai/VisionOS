import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IEventRepository } from '../../../../modules/intelligence/domain/repositories/event.repository';
import { Event } from '../../../../modules/intelligence/domain/entities/event';
import { IntelligenceMapper, RawIntelligenceEventRecord } from './intelligence.mapper';

@Injectable()
export class PrismaEventRepository implements IEventRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get delegate() {
    return this.prisma.getDelegate<RawIntelligenceEventRecord>('intelligenceEvent');
  }

  async save(event: Event): Promise<void> {
    await this.delegate.upsert({
      where: { id: event.id },
      create: { id: event.id, type: event.type, cameraId: event.cameraId, trackingId: event.trackingId, timestamp: event.timestamp, payload: event.payload },
      update: {},
    });
  }

  async findById(id: string): Promise<Event | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    if (!raw) return null;
    return IntelligenceMapper.eventToDomain(raw);
  }

  async findByCameraId(cameraId: string): Promise<Event[]> {
    const list = await this.delegate.findMany({ where: { cameraId } });
    return list.map((r: RawIntelligenceEventRecord) => IntelligenceMapper.eventToDomain(r));
  }
}
