import { JsonValue } from '@visionos/contracts';

export class SdkError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class TimeoutError extends SdkError {
  constructor(message: string = 'Request timed out') {
    super(message, 'TIMEOUT_ERROR');
  }
}

export class NetworkError extends SdkError {
  constructor(message: string = 'Network error occurred') {
    super(message, 'NETWORK_ERROR');
  }
}

export class ValidationError extends SdkError {
  constructor(message: string = 'Validation failed', public readonly details?: Record<string, JsonValue>) {
    super(message, 'VALIDATION_ERROR');
  }
}

export class AuthenticationError extends SdkError {
  constructor(message: string = 'Authentication failed') {
    super(message, 'AUTHENTICATION_ERROR');
  }
}
