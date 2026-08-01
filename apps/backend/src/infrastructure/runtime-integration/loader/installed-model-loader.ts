import { Injectable } from '@nestjs/common';
import { ModelRegistry } from '../../model-zoo/registry/model-registry';
import { DirectoryManager } from '../../model-installer/filesystem/directory-manager';
import { ModelMetadata } from '../../model-zoo/models/model-metadata';

export interface InstalledModelInfo {
  metadata: ModelMetadata;
  filePath: string;
  isInstalled: boolean;
}

@Injectable()
export class InstalledModelLoader {
  constructor(
    private readonly modelRegistry: ModelRegistry,
    private readonly dirManager: DirectoryManager,
  ) {}

  public async loadInstalledModel(modelId: string, version = '1.0.0'): Promise<InstalledModelInfo | null> {
    const manifest = this.modelRegistry.getModel(modelId);
    if (!manifest) return null;

    const activePath = this.dirManager.getArtifactActivePath(modelId, version);
    return {
      metadata: manifest.metadata,
      filePath: activePath,
      isInstalled: true,
    };
  }
}
