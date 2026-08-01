import { Injectable, Inject } from '@nestjs/common';
import { IZoneRepository } from '../repositories/zone.repository';
import { TrackedObject } from '../entities/tracked-object';
import { Zone } from '../entities/zone';

@Injectable()
export class ZoneEvaluationService {
  constructor(
    @Inject('IZoneRepository') private readonly zoneRepository: IZoneRepository,
  ) {}

  public async evaluateZones(cameraId: string, trackedObject: TrackedObject): Promise<Zone[]> {
    const zones = await this.zoneRepository.findByCameraId(cameraId);
    const matched: Zone[] = [];
    const center = {
      x: trackedObject.bbox.x + trackedObject.bbox.width / 2,
      y: trackedObject.bbox.y + trackedObject.bbox.height / 2,
    };
    for (const z of zones) {
      if (z.containsPoint(center)) {
        matched.push(z);
      }
    }
    return matched;
  }
}
