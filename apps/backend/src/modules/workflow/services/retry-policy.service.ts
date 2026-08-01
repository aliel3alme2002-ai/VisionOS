import { Injectable } from '@nestjs/common';

@Injectable()
export class RetryPolicyService {
  calculateNextRetry(policyId: string, attempt: number): number {
    if (!policyId) return 0;
    // Exponential backoff mock
    return Math.pow(2, attempt) * 1000;
  }
}
