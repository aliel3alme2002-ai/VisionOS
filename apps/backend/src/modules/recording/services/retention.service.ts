import { Injectable, Inject } from '@nestjs/common';
import { RecordingRepository, RECORDING_REPOSITORY } from '../repositories/recording.repository';
import { RecordingStorageProvider, RECORDING_STORAGE_PROVIDER } from '../providers/recording-storage.provider';

@Injectable()
export class RetentionService {
  constructor(
    @Inject(RECORDING_REPOSITORY) private readonly repo: RecordingRepository,
    @Inject(RECORDING_STORAGE_PROVIDER) private readonly storage: RecordingStorageProvider
  ) {}

  async processRetention(): Promise<void> {
    const expired = await this.repo.findExpiredRecordings(new Date());
    
    for (const recording of expired) {
      if (recording.storageLocation) {
        await this.storage.deleteRecording(recording.storageLocation);
      }
      await this.repo.updateStatus(recording.id, 'DELETED');
    }
  }
}
