import { Injectable } from '@nestjs/common';

@Injectable()
export class ArtifactVersionManager {
  private readonly activeVersions: Map<string, string> = new Map();
  private readonly previousVersions: Map<string, string> = new Map();

  public setActiveVersion(artifactId: string, version: string): void {
    const current = this.activeVersions.get(artifactId);
    if (current && current !== version) {
      this.previousVersions.set(artifactId, current);
    }
    this.activeVersions.set(artifactId, version);
  }

  public getActiveVersion(artifactId: string): string | null {
    return this.activeVersions.get(artifactId) ?? null;
  }

  public getPreviousVersion(artifactId: string): string | null {
    return this.previousVersions.get(artifactId) ?? null;
  }
}
