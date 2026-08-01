import { Module } from '@nestjs/common';
import { DetectionPipelineService } from './services/detection-pipeline.service';
import { InferenceService } from './services/inference.service';
import { TrackingService } from './services/tracking.service';
import { StreamRoutingService } from './services/stream-routing.service';
import { ResultNormalizationService } from './services/result-normalization.service';

import { DETECTION_JOB_REPOSITORY } from './repositories/detection-job.repository';
import { DETECTION_RESULT_REPOSITORY } from './repositories/detection-result.repository';

import { INFERENCE_PROVIDER } from './providers/inference.provider';
import { TRACKING_PROVIDER } from './providers/tracking.provider';
import { STREAM_PROVIDER } from './providers/stream-provider';

// Dummy implementation for compilation
const dummyRepository = {
  findById: async () => null,
  findByCamera: async () => [],
  findByJob: async () => [],
  save: async () => {},
  updateStatus: async () => {},
};

const dummyProvider = {
  runInference: async () => ({ objects: [], latency: 0, runtime: '', modelVersion: '' }),
  batchInference: async () => [],
  assignTracks: async () => [],
  getFrame: async () => ({ frameId: '', timestamp: new Date(), cameraId: '', streamId: '' }),
  startCapture: async () => true,
  stopCapture: async () => true,
};

@Module({
  providers: [
    DetectionPipelineService,
    InferenceService,
    TrackingService,
    StreamRoutingService,
    ResultNormalizationService,
    
    // Dummy providers for DI to compile without infrastructure
    { provide: DETECTION_JOB_REPOSITORY, useValue: dummyRepository },
    { provide: DETECTION_RESULT_REPOSITORY, useValue: dummyRepository },
    
    { provide: INFERENCE_PROVIDER, useValue: dummyProvider },
    { provide: TRACKING_PROVIDER, useValue: dummyProvider },
    { provide: STREAM_PROVIDER, useValue: dummyProvider }
  ],
  exports: [
    DetectionPipelineService,
    InferenceService,
    TrackingService,
    StreamRoutingService,
    ResultNormalizationService
  ],
})
export class DetectionModule {}
