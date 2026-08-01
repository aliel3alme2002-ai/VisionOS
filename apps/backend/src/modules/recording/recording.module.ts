import { Module } from '@nestjs/common';
import { RecordingEngineService } from './services/recording-engine.service';
import { RecordingLifecycleService } from './services/recording-lifecycle.service';
import { RecordingPolicyService } from './services/recording-policy.service';
import { RetentionService } from './services/retention.service';
import { RecordingValidatorService } from './services/recording-validator.service';

import { RECORDING_REPOSITORY } from './repositories/recording.repository';
import { RECORDING_POLICY_REPOSITORY } from './repositories/recording-policy.repository';
import { RECORDING_STORAGE_PROVIDER } from './providers/recording-storage.provider';

// Dummy implementation for compilation
const dummyRepository = {
  findById: async () => null,
  save: async () => {},
  updateStatus: async () => {},
  findExpiredRecordings: async () => [],
  findRecordingPolicy: async () => null,
  findRetentionPolicy: async () => null
};

const dummyProvider = {
  startRecording: async () => 'dummy_path',
  stopRecording: async () => 'dummy_path',
  deleteRecording: async () => true,
  archiveRecording: async () => 'dummy_path'
};

@Module({
  providers: [
    RecordingEngineService,
    RecordingLifecycleService,
    RecordingPolicyService,
    RetentionService,
    RecordingValidatorService,
    
    // Dummy providers for DI to compile without infrastructure
    { provide: RECORDING_REPOSITORY, useValue: dummyRepository },
    { provide: RECORDING_POLICY_REPOSITORY, useValue: dummyRepository },
    { provide: RECORDING_STORAGE_PROVIDER, useValue: dummyProvider }
  ],
  exports: [
    RecordingEngineService,
    RecordingLifecycleService,
    RetentionService
  ],
})
export class RecordingModule {}
