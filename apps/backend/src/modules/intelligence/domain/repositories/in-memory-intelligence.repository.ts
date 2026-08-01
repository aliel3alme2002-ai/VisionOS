import { Injectable } from '@nestjs/common';
import { IDetectionRepository } from './detection.repository';
import { ITrackedObjectRepository } from './tracked-object.repository';
import { IRuleRepository } from './rule.repository';
import { IZoneRepository } from './zone.repository';
import { IEventRepository } from './event.repository';

import { Detection } from '../entities/detection';
import { TrackedObject } from '../entities/tracked-object';
import { Rule } from '../entities/rule';
import { Zone } from '../entities/zone';
import { Event } from '../entities/event';

@Injectable()
export class InMemoryDetectionRepository implements IDetectionRepository {
  private readonly storage = new Map<string, Detection>();

  async save(detection: Detection): Promise<void> { this.storage.set(detection.id, detection); }
  async findById(id: string): Promise<Detection | null> { return this.storage.get(id) ?? null; }
  async findByCameraId(cameraId: string): Promise<Detection[]> {
    return Array.from(this.storage.values()).filter((d) => d.cameraId === cameraId);
  }
}

@Injectable()
export class InMemoryTrackedObjectRepository implements ITrackedObjectRepository {
  private readonly storage = new Map<string, TrackedObject>();

  async save(object: TrackedObject): Promise<void> { this.storage.set(object.trackingId, object); }
  async findByTrackingId(trackingId: string): Promise<TrackedObject | null> { return this.storage.get(trackingId) ?? null; }
  async findAllActive(): Promise<TrackedObject[]> { return Array.from(this.storage.values()); }
}

@Injectable()
export class InMemoryRuleRepository implements IRuleRepository {
  private readonly storage = new Map<string, Rule>();

  async save(rule: Rule): Promise<void> { this.storage.set(rule.id, rule); }
  async findById(id: string): Promise<Rule | null> { return this.storage.get(id) ?? null; }
  async findByOrgId(organizationId: string): Promise<Rule[]> {
    return Array.from(this.storage.values()).filter((r) => r.organizationId === organizationId);
  }
  async findActiveByOrgId(organizationId: string): Promise<Rule[]> {
    return Array.from(this.storage.values()).filter((r) => r.organizationId === organizationId && r.enabled);
  }
}

@Injectable()
export class InMemoryZoneRepository implements IZoneRepository {
  private readonly storage = new Map<string, Zone>();

  async save(zone: Zone): Promise<void> { this.storage.set(zone.id, zone); }
  async findById(id: string): Promise<Zone | null> { return this.storage.get(id) ?? null; }
  async findByCameraId(cameraId: string): Promise<Zone[]> {
    return Array.from(this.storage.values()).filter((z) => z.cameraId === cameraId);
  }
}

@Injectable()
export class InMemoryEventRepository implements IEventRepository {
  private readonly storage = new Map<string, Event>();

  async save(event: Event): Promise<void> { this.storage.set(event.id, event); }
  async findById(id: string): Promise<Event | null> { return this.storage.get(id) ?? null; }
  async findByCameraId(cameraId: string): Promise<Event[]> {
    return Array.from(this.storage.values()).filter((e) => e.cameraId === cameraId);
  }
}
