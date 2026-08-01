import { Injectable, LoggerService } from '@nestjs/common';
import { RequestContext } from '../context/request-context';

@Injectable()
export class VisionOSLogger implements LoggerService {
  private formatMessage(level: string, message: unknown, context?: string): string {
    const reqContext = RequestContext.current();
    const logObject: Record<string, unknown> = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: context || undefined,
      requestId: reqContext?.requestId || undefined,
      correlationId: reqContext?.correlationId || undefined,
      tenantId: reqContext?.tenantId || undefined,
    };

    return JSON.stringify(logObject);
  }

  log(message: unknown, context?: string): void {
    console.log(this.formatMessage('info', message, context));
  }

  error(message: unknown, trace?: string, context?: string): void {
    const reqContext = RequestContext.current();
    const logObject: Record<string, unknown> = {
      timestamp: new Date().toISOString(),
      level: 'error',
      message,
      trace: process.env.NODE_ENV === 'production' ? undefined : trace,
      context: context || undefined,
      requestId: reqContext?.requestId || undefined,
      correlationId: reqContext?.correlationId || undefined,
      tenantId: reqContext?.tenantId || undefined,
    };
    console.error(JSON.stringify(logObject));
  }

  warn(message: unknown, context?: string): void {
    console.warn(this.formatMessage('warn', message, context));
  }

  debug(message: unknown, context?: string): void {
    console.debug(this.formatMessage('debug', message, context));
  }

  verbose(message: unknown, context?: string): void {
    console.log(this.formatMessage('verbose', message, context));
  }
}
