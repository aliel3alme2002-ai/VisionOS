import { Recording } from '../domain/recording';

export class RecordingStartedEvent {
  constructor(
    public readonly recording: Recording,
    public readonly timestamp: Date = new Date()
  ) {}
}
