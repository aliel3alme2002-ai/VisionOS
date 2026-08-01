export interface ApiErrorDetail {
  code: string;
  message: string;
  field?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  errors?: ApiErrorDetail[];
  metadata?: Record<string, unknown>;
}

export class ApiResponseBuilder {
  public static success<T>(data: T, metadata?: Record<string, unknown>): ApiResponse<T> {
    const response: ApiResponse<T> = {
      success: true,
      data,
    };
    if (metadata) {
      response.metadata = metadata;
    }
    return response;
  }

  public static failure<T = unknown>(
    errors: ApiErrorDetail[],
    metadata?: Record<string, unknown>,
  ): ApiResponse<T> {
    const response: ApiResponse<T> = {
      success: false,
      errors,
    };
    if (metadata) {
      response.metadata = metadata;
    }
    return response;
  }
}
