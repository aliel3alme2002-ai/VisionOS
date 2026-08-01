import { Injectable, Inject } from '@nestjs/common';
import { RecordingRepository, RECORDING_REPOSITORY } from '../repositories/recording.repository';
import { RecordingStorageProvider, RECORDING_STORAGE_PROVIDER } from '../providers/recording-storage.provider';

@Injectable()
export class RecordingLifecycleService {
  constructor(
    @Inject(RECORDING_REPOSITORY) private readonly repo: RecordingRepository,
    @Inject(RECORDING_STORAGE_PROVIDER) private readonly storage: RecordingStorageProvider
  ) {}

  async stopRecording(recordingId: string): Promise<void> {
    const recording = await this.repo.findById(recordingId);
    if (!recording || recording.status !== 'RECORDING') return;

    if (recording.storageLocation) {
      await this.storage.stopRecording(recording.storageLocation);
      // update path/status
    }
    await this.repo.updateStatus(recordingId, 'STOPPED');
  }
}
