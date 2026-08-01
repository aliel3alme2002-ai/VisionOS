import { Injectable, NestMiddleware } from '@nestjs/common';
import { RequestContext } from '../../../application/common/middleware/request-context';

interface ExtendedRequest {
  headers: Record<string, string | string[] | undefined>;
  correlationId?: string;
  reqContext?: RequestContext;
  user?: {
    userId?: string;
    organizationId?: string;
    roles?: string[];
    permissions?: string[];
  };
}

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req: ExtendedRequest, _res: unknown, next: () => void): void {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const correlationId = req.correlationId || (Array.isArray(req.headers['x-correlation-id']) ? req.headers['x-correlation-id'][0] : req.headers['x-correlation-id']) || requestId;

    const context: RequestContext = {
      requestId,
      correlationId,
      roles: req.user?.roles || [],
      permissions: req.user?.permissions || [],
      timestamp: Date.now(),
    };

    if (req.user?.userId) {
      context.userId = req.user.userId;
    }

    if (req.user?.organizationId) {
      context.organizationId = req.user.organizationId;
    }

    req.reqContext = context;
    next();
  }
}
