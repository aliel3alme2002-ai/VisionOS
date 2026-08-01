import { Injectable } from '@nestjs/common';
import { ArtifactVersionManager } from './artifact-version-manager';

@Injectable()
export class RollbackService {
  constructor(private readonly versionManager: ArtifactVersionManager) {}

  public rollback(artifactId: string): { success: boolean; restoredVersion?: string } {
    const prevVersion = this.versionManager.getPreviousVersion(artifactId);
    if (!prevVersion) {
      return { success: false };
    }

    this.versionManager.setActiveVersion(artifactId, prevVersion);
    return { success: true, restoredVersion: prevVersion };
  }
}
