import { Module } from '@nestjs/common';
import { ModelIndex } from './registry/model-index';
import { ModelRegistry } from './registry/model-registry';
import { CatalogService } from './catalog/catalog.service';
import { ChecksumService } from './download/checksum.service';
import { DownloadManager } from './download/download-manager';
import { DownloadService } from './download/download.service';
import { ModelStorageService } from './storage/model-storage.service';
import { VersionManager } from './versioning/version-manager';
import { CompatibilityService } from './versioning/compatibility.service';
import { BenchmarkService } from './benchmark/benchmark.service';
import { MetadataValidationService } from './validation/metadata.service';
import { ModelValidator } from './validation/model-validator';
import { HuggingFaceProvider } from './providers/huggingface.provider';
import { UltralyticsProvider } from './providers/ultralytics.provider';
import { GitHubProvider } from './providers/github.provider';
import { LocalProvider } from './providers/local.provider';

@Module({
  providers: [
    ModelIndex,
    ModelRegistry,
    CatalogService,
    ChecksumService,
    DownloadManager,
    DownloadService,
    ModelStorageService,
    VersionManager,
    CompatibilityService,
    BenchmarkService,
    MetadataValidationService,
    ModelValidator,
    HuggingFaceProvider,
    UltralyticsProvider,
    GitHubProvider,
    LocalProvider,
  ],
  exports: [
    ModelRegistry,
    CatalogService,
    DownloadService,
    ModelStorageService,
    VersionManager,
    CompatibilityService,
    BenchmarkService,
    ModelValidator,
  ],
})
export class ModelZooModule {}
