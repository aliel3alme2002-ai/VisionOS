import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ICameraRepository } from '../../../../modules/vision/domain/repositories/camera.repository';
import { Camera } from '../../../../modules/vision/domain/entities/camera';
import { VisionMapper, RawCameraRecord } from './vision.mapper';

@Injectable()
export class PrismaCameraRepository implements ICameraRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get delegate() {
    return this.prisma.getDelegate<RawCameraRecord>('camera');
  }

  async save(camera: Camera): Promise<void> {
    const data = VisionMapper.cameraToPrisma(camera);
    await this.delegate.upsert({
      where: { id: camera.id },
      create: data,
      update: data,
    });
  }

  async findById(id: string, includeDeleted = false): Promise<Camera | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    if (!raw) return null;
    const cam = VisionMapper.cameraToDomain(raw);
    if (!includeDeleted && cam.isDeleted()) return null;
    return cam;
  }

  async findByOrgId(organizationId: string, includeDeleted = false): Promise<Camera[]> {
    const list = await this.delegate.findMany({ where: { organizationId } });
    return list
      .map((r: RawCameraRecord) => VisionMapper.cameraToDomain(r))
      .filter((c: Camera) => includeDeleted || !c.isDeleted());
  }

  async findByIpOrMac(ipAddress: string, macAddress?: string | null): Promise<Camera | null> {
    const raw = await this.delegate.findFirst({
      where: { OR: [{ ipAddress }, ...(macAddress ? [{ macAddress }] : [])] },
    });
    if (!raw) return null;
    return VisionMapper.cameraToDomain(raw);
  }
}
