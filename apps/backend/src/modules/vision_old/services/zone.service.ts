import { Injectable, Inject } from '@nestjs/common';
import { Zone } from '../domain/zone';
import { ZoneRepository, ZONE_REPOSITORY } from '../repositories/zone.repository';

@Injectable()
export class ZoneService {
  constructor(
    @Inject(ZONE_REPOSITORY) private readonly zoneRepo: ZoneRepository
  ) {}

  async createZone(zone: Zone): Promise<void> {
    await this.zoneRepo.save(zone);
  }
}
