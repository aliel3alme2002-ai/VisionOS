import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IDetectionRepository } from '../../../../modules/intelligence/domain/repositories/detection.repository';
import { Detection } from '../../../../modules/intelligence/domain/entities/detection';
import { IntelligenceMapper, RawDetectionRecord } from './intelligence.mapper';

@Injectable()
export class PrismaDetectionRepository implements IDetectionRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get delegate() {
    return this.prisma.getDelegate<RawDetectionRecord>('detectionRecord');
  }

  async save(detection: Detection): Promise<void> {
    await this.delegate.upsert({
      where: { id: detection.id },
      create: { id: detection.id, cameraId: detection.cameraId, pipelineId: detection.pipelineId, runtimeId: detection.runtimeId, frameId: detection.frameId, timestamp: detection.timestamp },
      update: {},
    });
  }

  async findById(id: string): Promise<Detection | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    if (!raw) return null;
    return IntelligenceMapper.detectionToDomain(raw);
  }

  async findByCameraId(cameraId: string): Promise<Detection[]> {
    const list = await this.delegate.findMany({ where: { cameraId } });
    return list.map((r: RawDetectionRecord) => IntelligenceMapper.detectionToDomain(r));
  }
}
