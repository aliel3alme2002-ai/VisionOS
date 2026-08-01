import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestContext } from '../../../application/common/middleware/request-context';

export interface StandardApiResponse<T> {
  success: boolean;
  data: T;
  metadata: {
    requestId: string;
    correlationId: string;
    timestamp: string;
    duration: number;
  };
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, StandardApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<StandardApiResponse<T>> {
    const startTime = Date.now();
    const req = context.switchToHttp().getRequest<{ reqContext?: RequestContext }>();

    return next.handle().pipe(
      map((data: T) => {
        const duration = Date.now() - startTime;
        const reqCtx = req.reqContext;

        return {
          success: true,
          data,
          metadata: {
            requestId: reqCtx?.requestId || 'N/A',
            correlationId: reqCtx?.correlationId || 'N/A',
            timestamp: new Date().toISOString(),
            duration,
          },
        };
      }),
    );
  }
}
