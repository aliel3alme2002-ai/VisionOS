import { Injectable } from '@nestjs/common';
import { ArtifactInstallation } from '../models/artifact-installation';
import { DownloadClient } from '../download/download-client';
import { ChecksumValidator } from '../validation/checksum-validator';
import { ArchiveExtractor } from '../extract/archive-extractor';
import { ArtifactStorage } from '../filesystem/artifact-storage';
import { DirectoryManager } from '../filesystem/directory-manager';
import { ArtifactVersionManager } from '../versioning/artifact-version-manager';
import { RollbackService } from '../versioning/rollback.service';
import { CleanupService } from '../filesystem/cleanup.service';
import { Artifact } from '../models/artifact';

@Injectable()
export class ArtifactInstaller {
  constructor(
    private readonly downloader: DownloadClient,
    private readonly checksumValidator: ChecksumValidator,
    private readonly extractor: ArchiveExtractor,
    private readonly storage: ArtifactStorage,
    private readonly dirManager: DirectoryManager,
    private readonly versionManager: ArtifactVersionManager,
    private readonly rollbackService: RollbackService,
    private readonly cleanupService: CleanupService,
  ) {}

  public async install(artifact: Artifact): Promise<ArtifactInstallation> {
    const installationId = `inst-${artifact.id}-${Date.now()}`;
    const stagingPath = this.dirManager.getArtifactStagingPath(artifact.id, artifact.version);
    const targetPath = this.dirManager.getArtifactActivePath(artifact.id, artifact.version);

    const installation = new ArtifactInstallation({
      installationId,
      artifactId: artifact.id,
      version: artifact.version,
      state: 'DOWNLOADING',
      bytesDownloaded: 0,
      totalBytes: artifact.sizeBytes,
      stagingPath,
      targetPath,
      startedAt: new Date(),
    });

    try {
      // 1. Download
      const dlResult = await this.downloader.download(artifact.downloadUrl, stagingPath);
      installation.bytesDownloaded = dlResult.bytesDownloaded;

      // 2. Verify
      installation.state = 'VERIFYING';
      const isValid = await this.checksumValidator.validateSHA256(stagingPath, artifact.sha256);
      if (!isValid) {
        throw new Error(`Checksum validation failed for artifact ${artifact.id}`);
      }

      // 3. Extract
      installation.state = 'EXTRACTING';
      await this.extractor.extract(stagingPath, targetPath);

      // 4. Install (Atomic Move / Activate)
      installation.state = 'INSTALLING';
      this.storage.atomicMove(stagingPath, targetPath);
      this.versionManager.setActiveVersion(artifact.id, artifact.version);

      // 5. Ready & Cleanup
      installation.state = 'READY';
      installation.completedAt = new Date();
      this.cleanupService.cleanupStaging(artifact.id, artifact.version);

      return installation;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      installation.state = 'FAILED';
      installation.errorMessage = msg;

      // Atomic Rollback
      installation.state = 'ROLLBACK';
      this.rollbackService.rollback(artifact.id);
      this.cleanupService.cleanupStaging(artifact.id, artifact.version);
      installation.state = 'FAILED';

      return installation;
    }
  }
}
