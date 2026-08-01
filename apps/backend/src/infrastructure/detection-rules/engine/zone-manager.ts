import { Injectable } from '@nestjs/common';
import { Zone } from '../zone/zone';

@Injectable()
export class ZoneManager {
  private readonly zones: Map<string, Zone> = new Map();

  public registerZone(zone: Zone): void {
    this.zones.set(zone.zoneId, zone);
  }

  public removeZone(zoneId: string): boolean {
    return this.zones.delete(zoneId);
  }

  public getZone(zoneId: string): Zone | null {
    return this.zones.get(zoneId) ?? null;
  }

  public listZones(): Zone[] {
    return Array.from(this.zones.values());
  }
}
