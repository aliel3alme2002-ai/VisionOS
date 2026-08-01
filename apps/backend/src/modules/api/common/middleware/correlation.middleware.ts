import { Injectable, NestMiddleware } from '@nestjs/common';
import { CorrelationId } from '../../../application/common/middleware/correlation-id';

interface ExtendedRequest {
  headers: Record<string, string | string[] | undefined>;
  correlationId?: string;
}

interface ExtendedResponse {
  setHeader(name: string, value: string): void;
}

@Injectable()
export class CorrelationMiddleware implements NestMiddleware {
  use(req: ExtendedRequest, res: ExtendedResponse, next: () => void): void {
    const incomingHeader = req.headers['x-correlation-id'];
    const correlationHeader = Array.isArray(incomingHeader) ? incomingHeader[0] : incomingHeader;

    const corrId = new CorrelationId(correlationHeader).getValue();
    req.correlationId = corrId;
    res.setHeader('x-correlation-id', corrId);

    next();
  }
}
