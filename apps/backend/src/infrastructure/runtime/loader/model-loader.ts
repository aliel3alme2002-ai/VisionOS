import { Injectable } from '@nestjs/common';
import { RuntimeRegistry } from '../manager/runtime-registry';

@Injectable()
export class ModelLoader {
  constructor(private readonly registry: RuntimeRegistry) {}

  public async load(modelId: string, modelPath: string, runtimeName: string): Promise<boolean> {
    const plugin = this.registry.getPlugin(runtimeName);
    if (!plugin) return false;
    return plugin.loadModel(modelId, modelPath);
  }
}
