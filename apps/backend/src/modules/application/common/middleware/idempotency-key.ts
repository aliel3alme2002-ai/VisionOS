export type IdempotencyStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export interface IdempotencyRecord<T = unknown> {
  key: string;
  requestHash: string;
  status: IdempotencyStatus;
  response?: T;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class IdempotencyKey {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Idempotency key cannot be empty');
    }
    this.value = value.trim();
  }

  public getValue(): string {
    return this.value;
  }
}
