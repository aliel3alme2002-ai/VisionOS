import { ApplicationException } from './application.exception';
import { ValidationErrorDetail } from '../validation/validation-result';

export class ValidationException extends ApplicationException {
  public readonly errors: ValidationErrorDetail[];

  constructor(errors: ValidationErrorDetail[], message = 'Validation failed') {
    super(message, 'VALIDATION_ERROR');
    this.name = 'ValidationException';
    this.errors = errors;
  }
}
