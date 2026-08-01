import { Injectable } from '@nestjs/common';
import { RuntimeClientProvider } from '../client/runtime-client.provider';

@Injectable()
export class ConnectionService {
  constructor(private readonly clientProvider: RuntimeClientProvider) {}

  async connect(engine: string): Promise<boolean> {
    const client = this.clientProvider.getClient(engine);
    return client.connect();
  }

  async disconnect(engine: string): Promise<void> {
    const client = this.clientProvider.getClient(engine);
    await client.disconnect();
  }
}
