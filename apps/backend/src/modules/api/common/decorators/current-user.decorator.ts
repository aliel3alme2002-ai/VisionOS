import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestContext } from '../../../application/common/middleware/request-context';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string | undefined => {
    const request = ctx.switchToHttp().getRequest<{ user?: { userId?: string }; reqContext?: RequestContext }>();
    return request.user?.userId || request.reqContext?.userId;
  },
);
