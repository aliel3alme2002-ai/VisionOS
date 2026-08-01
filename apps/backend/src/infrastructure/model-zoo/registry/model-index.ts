import { Injectable } from '@nestjs/common';
import { ModelManifest } from './model-manifest';

@Injectable()
export class ModelIndex {
  private readonly index: Map<string, ModelManifest> = new Map();

  public register(manifest: ModelManifest): void {
    this.index.set(manifest.metadata.id, manifest);
  }

  public unregister(modelId: string): boolean {
    return this.index.delete(modelId);
  }

  public find(modelId: string): ModelManifest | null {
    return this.index.get(modelId) ?? null;
  }

  public listAll(): ModelManifest[] {
    return Array.from(this.index.values());
  }
}
