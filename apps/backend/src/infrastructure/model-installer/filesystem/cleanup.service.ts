import { Injectable } from '@nestjs/common';
import { DirectoryManager } from './directory-manager';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CleanupService {
  constructor(private readonly dirManager: DirectoryManager) {}

  public cleanupStaging(artifactId: string, version: string): void {
    const stagingPath = this.dirManager.getArtifactStagingPath(artifactId, version);
    this.dirManager.removeDir(stagingPath);
  }

  public cleanupOldTempFiles(maxAgeMs = 86400000): void {
    const stagingDir = this.dirManager.getStagingDir();
    if (!fs.existsSync(stagingDir)) return;

    const files = fs.readdirSync(stagingDir);
    const now = Date.now();

    for (const file of files) {
      const fullPath = path.join(stagingDir, file);
      const stat = fs.statSync(fullPath);
      if (now - stat.mtimeMs > maxAgeMs) {
        this.dirManager.removeDir(fullPath);
      }
    }
  }
}
