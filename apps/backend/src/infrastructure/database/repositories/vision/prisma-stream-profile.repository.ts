import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IStreamProfileRepository } from '../../../../modules/vision/domain/repositories/stream-profile.repository';
import { StreamProfile } from '../../../../modules/vision/domain/entities/stream-profile';
import { VisionMapper, RawStreamProfileRecord } from './vision.mapper';

@Injectable()
export class PrismaStreamProfileRepository implements IStreamProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get delegate() {
    return this.prisma.getDelegate<RawStreamProfileRecord>('streamProfile');
  }

  async save(profile: StreamProfile): Promise<void> {
    await this.delegate.upsert({
      where: { id: profile.id },
      create: { id: profile.id, name: profile.name, codec: profile.codec, resolution: profile.resolution, fps: profile.fps, bitrate: profile.bitrate, transport: profile.transport },
      update: { name: profile.name, codec: profile.codec, resolution: profile.resolution, fps: profile.fps, bitrate: profile.bitrate, transport: profile.transport },
    });
  }

  async findById(id: string): Promise<StreamProfile | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    if (!raw) return null;
    return VisionMapper.streamProfileToDomain(raw);
  }

  async findAll(): Promise<StreamProfile[]> {
    const list = await this.delegate.findMany();
    return list.map((r: RawStreamProfileRecord) => VisionMapper.streamProfileToDomain(r));
  }
}
