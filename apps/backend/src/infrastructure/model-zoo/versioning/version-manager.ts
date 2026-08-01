import { Injectable } from '@nestjs/common';
import { ModelMetadata } from '../models/model-metadata';

@Injectable()
export class VersionManager {
  private readonly versionStore: Map<string, ModelMetadata[]> = new Map();

  public addVersion(metadata: ModelMetadata): void {
    const versions = this.versionStore.get(metadata.name) ?? [];
    versions.push(metadata);
    this.versionStore.set(metadata.name, versions);
  }

  public getLatestVersion(modelName: string): ModelMetadata | null {
    const versions = this.versionStore.get(modelName);
    if (!versions || versions.length === 0) return null;
    return versions[versions.length - 1] ?? null;
  }

  public getAllVersions(modelName: string): ModelMetadata[] {
    return this.versionStore.get(modelName) ?? [];
  }
}
