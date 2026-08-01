import { Injectable } from '@nestjs/common';

@Injectable()
export class RecordingService {
  async getRecording(cameraId: string): Promise<string> {
    return 'http://frigate.internal/recordings/' + cameraId;
  }
}
