import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

interface ExtendedRequest {
  method: string;
  url: string;
  correlationId?: string;
  reqContext?: {
    userId?: string;
    organizationId?: string;
  };
}

interface ExtendedResponse {
  statusCode: number;
  on(event: 'finish', listener: () => void): void;
}

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: ExtendedRequest, res: ExtendedResponse, next: () => void): void {
    const { method, url } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - startTime;
      const { statusCode } = res;
      const corrId = req.correlationId || 'N/A';
      const userId = req.reqContext?.userId || 'anonymous';
      const orgId = req.reqContext?.organizationId || 'none';

      this.logger.log(
        `[${method}] ${url} ${statusCode} - ${duration}ms [CorrId: ${corrId}] [User: ${userId}] [Org: ${orgId}]`,
      );
    });

    next();
  }
}
