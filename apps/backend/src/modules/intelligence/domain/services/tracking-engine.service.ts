import { Injectable, Inject } from '@nestjs/common';
import { ITrackedObjectRepository } from '../repositories/tracked-object.repository';
import { TrackedObject } from '../entities/tracked-object';
import { BoundingBox } from '../value-objects/bounding-box';
import { randomUUID } from 'crypto';

@Injectable()
export class TrackingEngineService {
  constructor(
    @Inject('ITrackedObjectRepository') private readonly trackedObjectRepository: ITrackedObjectRepository,
  ) {}

  public async processDetection(className: string, confidence: number, bbox: BoundingBox): Promise<TrackedObject> {
    const trackingId = `TRK-${randomUUID().substring(0, 8)}`;
    const obj = new TrackedObject({
      id: randomUUID(),
      trackingId,
      className,
      confidence,
      bbox,
    });
    await this.trackedObjectRepository.save(obj);
    return obj;
  }
}
