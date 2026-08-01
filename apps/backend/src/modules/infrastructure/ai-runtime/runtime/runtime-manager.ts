import { Injectable } from '@nestjs/common';
import { RuntimeRegistry } from './runtime-registry';
import { RuntimeClientProvider } from '../client/runtime-client.provider';
import { RuntimeModel } from '../models/runtime-model';
import { RuntimeCapability } from '../models/runtime-capability';

@Injectable()
export class RuntimeManager {
  constructor(
    private readonly registry: RuntimeRegistry,
    private readonly clientProvider: RuntimeClientProvider
  ) {}

  async createSession(engine: string): Promise<string> {
    const id = 'sess_' + engine + '_' + Date.now();
    this.registry.register({
      id,
      engine,
      state: 'READY',
      startedAt: new Date()
    });
    return id;
  }

  async loadModel(sessionId: string, model: RuntimeModel): Promise<void> {
    const session = this.registry.lookup(sessionId);
    if (!session) return;
    
    session.state = 'LOADING';
    const client = this.clientProvider.getClient(session.engine);
    await client.loadModel(model.id);
    
    session.model = model;
    session.state = 'RUNNING';
  }

  async unloadModel(sessionId: string): Promise<void> {
    const session = this.registry.lookup(sessionId);
    if (!session || !session.model) return;
    
    session.state = 'STOPPING';
    const client = this.clientProvider.getClient(session.engine);
    await client.unloadModel(session.model.id);
    
    delete session.model;
    session.state = 'READY';
  }

  getCapabilities(engine: string): RuntimeCapability[] {
    if (!engine) return [];
    return [
      { id: 'cap_det', name: 'Object Detection', category: 'Detection', enabled: true },
      { id: 'cap_class', name: 'Image Classification', category: 'Classification', enabled: true }
    ];
  }
}
