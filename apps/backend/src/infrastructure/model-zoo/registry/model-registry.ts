import { Injectable } from '@nestjs/common';
import { ModelIndex } from './model-index';
import { ModelManifest } from './model-manifest';
import { ModelMetadata } from '../models/model-metadata';
import { CatalogService } from '../catalog/catalog.service';

@Injectable()
export class ModelRegistry {
  constructor(
    private readonly index: ModelIndex,
    private readonly catalog: CatalogService,
  ) {
    this.loadBuiltinModels();
  }

  private loadBuiltinModels(): void {
    for (const model of this.catalog.getBuiltinModels()) {
      this.index.register({
        manifestVersion: '1.0.0',
        registeredAt: new Date(),
        metadata: model,
        isBuiltin: true,
        status: 'READY',
      });
    }
  }

  public registerCustomModel(metadata: ModelMetadata, storagePath?: string): ModelManifest {
    const manifest: ModelManifest = {
      manifestVersion: '1.0.0',
      registeredAt: new Date(),
      metadata,
      storagePath,
      isBuiltin: false,
      status: 'READY',
    };
    this.index.register(manifest);
    return manifest;
  }

  public getModel(id: string): ModelManifest | null {
    return this.index.find(id);
  }

  public listModels(): ModelManifest[] {
    return this.index.listAll();
  }

  public unregisterModel(id: string): boolean {
    return this.index.unregister(id);
  }
}
