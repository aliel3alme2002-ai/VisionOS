import { ValidationPipe as NestValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationErrorDetail } from '../../../application/common/validation/validation-result';

export function createApiValidationPipe(): NestValidationPipe {
  return new NestValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => {
      const formattedErrors: ValidationErrorDetail[] = errors.map((err) => ({
        field: err.property,
        message: err.constraints ? Object.values(err.constraints).join(', ') : 'Invalid parameter',
      }));
      return new BadRequestException(formattedErrors);
    },
  });
}
