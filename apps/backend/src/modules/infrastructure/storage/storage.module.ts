import { Module } from '@nestjs/common';
import { StorageAdapterImpl } from './adapter/storage.adapter';
import { StorageClientProvider } from './provider/storage-client.provider';
import { UploadService } from './services/upload.service';
import { DownloadService } from './services/download.service';
import { DeleteService } from './services/delete.service';
import { MetadataService } from './services/metadata.service';
import { LifecycleService } from './services/lifecycle.service';
import { HealthService } from './services/health.service';

@Module({
  providers: [
    StorageAdapterImpl,
    StorageClientProvider,
    UploadService,
    DownloadService,
    DeleteService,
    MetadataService,
    LifecycleService,
    HealthService
  ],
  exports: [
    StorageAdapterImpl,
    StorageClientProvider,
    UploadService,
    DownloadService,
    DeleteService,
    HealthService
  ]
})
export class StorageModule {}
