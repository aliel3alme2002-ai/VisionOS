import { ValidationResult } from './validation-result';

export interface Validator<T> {
  validate(target: T): Promise<ValidationResult> | ValidationResult;
}
