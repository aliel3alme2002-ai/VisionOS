import { Injectable } from '@nestjs/common';
import { DomainEvent } from '../domain/domain-event';

@Injectable()
export class EventValidatorService {
  validate(event: DomainEvent): boolean {
    if (!event.name || !event.aggregateId) return false;
    return true;
  }
}
