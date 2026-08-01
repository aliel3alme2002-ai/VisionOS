import { StreamProfile } from '../domain/stream-profile';

export class StreamCreatedEvent {
  constructor(
    public readonly streamProfile: StreamProfile,
    public readonly timestamp: Date = new Date()
  ) {}
}
