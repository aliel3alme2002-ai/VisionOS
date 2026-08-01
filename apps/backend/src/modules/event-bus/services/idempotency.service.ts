import { Injectable } from '@nestjs/common';

@Injectable()
export class IdempotencyService {
  async isProcessed(eventId: string): Promise<boolean> {
    if (!eventId) return false;
    return false;
  }
}
