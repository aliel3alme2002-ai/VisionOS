import { Injectable } from '@nestjs/common';
import { LocalInferenceRequest } from '../models/inference-request';

@Injectable()
export class BatchService {
  batch(requests: LocalInferenceRequest[]): LocalInferenceRequest[] {
    return requests;
  }
}
