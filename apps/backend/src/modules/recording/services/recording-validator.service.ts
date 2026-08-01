import { Injectable } from '@nestjs/common';
import { RecordingRequest } from '../domain/recording-request';

@Injectable()
export class RecordingValidatorService {
  isValid(request: RecordingRequest): boolean {
    if (!request.cameraId || !request.organizationId) return false;
    return true;
  }
}
