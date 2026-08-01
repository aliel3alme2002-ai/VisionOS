import { Injectable } from '@nestjs/common';
import { RuntimeClient } from './runtime-client';
import { RuntimeFactory } from './runtime-factory';

@Injectable()
export class RuntimeClientProvider {
  constructor(private readonly factory: RuntimeFactory) {}

  getClient(engine: string): RuntimeClient {
    return this.factory.createClient(engine);
  }
}
