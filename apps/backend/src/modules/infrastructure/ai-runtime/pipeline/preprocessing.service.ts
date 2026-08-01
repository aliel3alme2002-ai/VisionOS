import { Injectable } from '@nestjs/common';
import { LocalInferenceRequest } from '../models/inference-request';

@Injectable()
export class PreprocessingService {
  async process(request: LocalInferenceRequest): Promise<LocalInferenceRequest> {
    return request;
  }
}
