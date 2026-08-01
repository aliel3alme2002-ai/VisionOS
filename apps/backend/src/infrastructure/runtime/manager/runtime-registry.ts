import { Injectable } from '@nestjs/common';
import { RuntimePlugin } from '../plugins/runtime-plugin';

@Injectable()
export class RuntimeRegistry {
  private readonly plugins: Map<string, RuntimePlugin> = new Map();

  public registerPlugin(plugin: RuntimePlugin): void {
    this.plugins.set(plugin.pluginName.toLowerCase(), plugin);
  }

  public getPlugin(name: string): RuntimePlugin | null {
    return this.plugins.get(name.toLowerCase()) ?? null;
  }

  public listPlugins(): RuntimePlugin[] {
    return Array.from(this.plugins.values());
  }
}
