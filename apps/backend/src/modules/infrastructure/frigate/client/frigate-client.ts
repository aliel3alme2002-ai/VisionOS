import { FrigateEvent } from '../models/frigate-event';

export interface FrigateClient {
  connect(): Promise<boolean>;
  disconnect(): Promise<void>;
  subscribeEvents(callback: (event: FrigateEvent) => void): Promise<void>;
  fetchSnapshot(eventId: string): Promise<Buffer>;
  fetchClip(eventId: string): Promise<Buffer>;
}
