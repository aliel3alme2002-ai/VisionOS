export interface ValidationErrorDetail {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrorDetail[];
}
