import { Injectable, Inject } from '@nestjs/common';
import { RecordingRequest } from '../domain/recording-request';
import { RecordingRepository, RECORDING_REPOSITORY } from '../repositories/recording.repository';
import { RecordingValidatorService } from './recording-validator.service';
import { RecordingStorageProvider, RECORDING_STORAGE_PROVIDER } from '../providers/recording-storage.provider';
import { Recording } from '../domain/recording';

@Injectable()
export class RecordingEngineService {
  constructor(
    @Inject(RECORDING_REPOSITORY) private readonly repo: RecordingRepository,
    @Inject(RECORDING_STORAGE_PROVIDER) private readonly storage: RecordingStorageProvider,
    private readonly validator: RecordingValidatorService
  ) {}

  async startRecording(request: RecordingRequest): Promise<string | null> {
    if (!this.validator.isValid(request)) return null;

    const storageId = await this.storage.startRecording(request.cameraId, {});
    
    const recordingId = 'rec_' + Date.now().toString();
    const recording: Recording = {
      id: recordingId,
      organizationId: request.organizationId,
      cameraId: request.cameraId,
      status: 'RECORDING',
      startTime: new Date(),
      storageLocation: storageId,
      createdAt: new Date()
    };

    await this.repo.save(recording);
    return recordingId;
  }
}
