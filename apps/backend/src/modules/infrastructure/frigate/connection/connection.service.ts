import { Injectable } from '@nestjs/common';
import { FrigateClientProvider } from '../client/frigate-client.provider';

@Injectable()
export class ConnectionService {
  constructor(private readonly clientProvider: FrigateClientProvider) {}

  async connect(): Promise<boolean> {
    return this.clientProvider.getClient().connect();
  }

  async disconnect(): Promise<void> {
    await this.clientProvider.getClient().disconnect();
  }

  async reconnect(): Promise<boolean> {
    await this.disconnect();
    return this.connect();
  }
}
