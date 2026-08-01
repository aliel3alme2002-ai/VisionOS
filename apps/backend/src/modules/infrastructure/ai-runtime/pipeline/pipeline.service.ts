import { Injectable } from '@nestjs/common';
import { PreprocessingService } from './preprocessing.service';
import { PostprocessingService } from './postprocessing.service';
import { RuntimeClientProvider } from '../client/runtime-client.provider';
import { LocalInferenceRequest } from '../models/inference-request';
import { InferenceResponse } from '../../../integration/models/inference-response';

@Injectable()
export class PipelineService {
  constructor(
    private readonly preprocessing: PreprocessingService,
    private readonly postprocessing: PostprocessingService,
    private readonly clientProvider: RuntimeClientProvider
  ) {}

  async execute(request: LocalInferenceRequest, engine: string): Promise<InferenceResponse> {
    const preprocessed = await this.preprocessing.process(request);
    
    const client = this.clientProvider.getClient(engine);
    const rawResponse = await client.infer(preprocessed);
    
    return this.postprocessing.process(rawResponse);
  }
}
