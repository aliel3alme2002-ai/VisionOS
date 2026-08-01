import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { RequestContext } from '../context/request-context';
import { VisionOSLogger } from '../logging/visionos-logger.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: VisionOSLogger) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<{ status: (code: number) => { send: (body: unknown) => void } }>();
    const reqContext = RequestContext.current();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = 'INTERNAL_SERVER_ERROR';
    let message = 'An unexpected error occurred';
    let details: Record<string, unknown> = {};

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const obj = res as Record<string, unknown>;
        code = (obj['code'] as string) || (obj['error'] as string) || exception.name;
        message = (obj['message'] as string) || exception.message;
        details = (obj['details'] as Record<string, unknown>) || {};
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      code = exception.constructor.name;
    }

    this.logger.error(
      `Unhandled Exception [${code}]: ${message}`,
      exception instanceof Error ? exception.stack : undefined,
      'GlobalExceptionFilter'
    );

    const responsePayload = {
      success: false as const,
      error: {
        code,
        message,
        details,
      },
      requestId: reqContext?.requestId || 'unknown',
      timestamp: new Date().toISOString(),
    };

    response.status(status).send(responsePayload);
  }
}
