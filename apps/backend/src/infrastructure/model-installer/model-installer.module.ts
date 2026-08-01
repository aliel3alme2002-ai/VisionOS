import { Module } from '@nestjs/common';
import { DownloadClient } from './download/download-client';
import { ResumeDownloadService } from './download/resume-download.service';
import { ZipService } from './extract/zip.service';
import { TarService } from './extract/tar.service';
import { ArchiveExtractor } from './extract/archive-extractor';
import { ChecksumValidator } from './validation/checksum-validator';
import { SignatureValidator } from './validation/signature-validator';
import { ManifestValidator } from './validation/manifest-validator';
import { DirectoryManager } from './filesystem/directory-manager';
import { ArtifactStorage } from './filesystem/artifact-storage';
import { CleanupService } from './filesystem/cleanup.service';
import { ArtifactVersionManager } from './versioning/artifact-version-manager';
import { RollbackService } from './versioning/rollback.service';
import { HuggingFaceArtifactProvider } from './providers/huggingface.provider';
import { GitHubArtifactProvider } from './providers/github.provider';
import { UltralyticsArtifactProvider } from './providers/ultralytics.provider';
import { LocalArtifactProvider } from './providers/local.provider';
import { ArtifactInstaller } from './installer/artifact-installer';
import { InstallerService } from './installer/installer.service';

@Module({
  providers: [
    DownloadClient,
    ResumeDownloadService,
    ZipService,
    TarService,
    ArchiveExtractor,
    ChecksumValidator,
    SignatureValidator,
    ManifestValidator,
    DirectoryManager,
    ArtifactStorage,
    CleanupService,
    ArtifactVersionManager,
    RollbackService,
    HuggingFaceArtifactProvider,
    GitHubArtifactProvider,
    UltralyticsArtifactProvider,
    LocalArtifactProvider,
    ArtifactInstaller,
    InstallerService,
  ],
  exports: [
    InstallerService,
    ArtifactInstaller,
    ArtifactVersionManager,
    RollbackService,
    DirectoryManager,
    ArtifactStorage,
    ChecksumValidator,
  ],
})
export class ModelInstallerModule {}
