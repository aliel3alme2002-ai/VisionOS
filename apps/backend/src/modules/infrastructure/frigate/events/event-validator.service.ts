import { Injectable } from '@nestjs/common';
import { FrigateEvent } from '../models/frigate-event';

@Injectable()
export class FrigateEventValidator {
  validate(event: FrigateEvent): boolean {
    if (!event.eventId || !event.cameraId || !event.label) {
      return false;
    }
    if (event.score < 0 || event.score > 1.0) {
      return false;
    }
    return true;
  }
}
