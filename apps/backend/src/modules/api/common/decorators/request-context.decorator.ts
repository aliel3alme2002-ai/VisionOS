import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestContext } from '../../../application/common/middleware/request-context';

export const ReqContext = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): RequestContext | undefined => {
    const request = ctx.switchToHttp().getRequest<{ reqContext?: RequestContext }>();
    return request.reqContext;
  },
);
