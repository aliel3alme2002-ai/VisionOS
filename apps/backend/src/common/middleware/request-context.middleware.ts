import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { RequestContext } from '../context/request-context';

interface IncomingMessageLike {
  headers: Record<string, string | string[] | undefined>;
}

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req: IncomingMessageLike, _res: unknown, next: () => void): void {
    const reqHeader = req.headers['x-request-id'];
    const corrHeader = req.headers['x-correlation-id'];
    const traceHeader = req.headers['x-trace-id'];
    const tenantHeader = req.headers['x-tenant-id'];
    const userHeader = req.headers['x-user-id'];

    const requestId = (Array.isArray(reqHeader) ? reqHeader[0] : reqHeader) || randomUUID();
    const correlationId = (Array.isArray(corrHeader) ? corrHeader[0] : corrHeader) || requestId;
    const traceId = (Array.isArray(traceHeader) ? traceHeader[0] : traceHeader) || randomUUID();
    const tenantId = Array.isArray(tenantHeader) ? tenantHeader[0] : tenantHeader;
    const userId = Array.isArray(userHeader) ? userHeader[0] : userHeader;

    RequestContext.run(
      { requestId, correlationId, traceId, tenantId, userId },
      () => next()
    );
  }
}
