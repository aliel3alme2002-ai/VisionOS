import { Injectable } from '@nestjs/common';
import { ApiResponse, ApiResponseBuilder, ApiErrorDetail } from '../../../application/common/dto/api-response';

@Injectable()
export abstract class BaseController {
  protected success<T>(data: T, metadata?: Record<string, unknown>): ApiResponse<T> {
    return ApiResponseBuilder.success(data, metadata);
  }

  protected failure<T = unknown>(
    errors: ApiErrorDetail[],
    metadata?: Record<string, unknown>,
  ): ApiResponse<T> {
    return ApiResponseBuilder.failure<T>(errors, metadata);
  }
}
