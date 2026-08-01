import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const className = context.getClass().name;
    const handlerName = context.getHandler().name;
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        this.logger.debug(`Execution of ${className}.${handlerName} took ${Date.now() - now}ms`);
      }),
    );
  }
}
