import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestContext } from '../../../application/common/middleware/request-context';

export const CurrentOrganization = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string | undefined => {
    const request = ctx.switchToHttp().getRequest<{ user?: { organizationId?: string }; reqContext?: RequestContext }>();
    return request.user?.organizationId || request.reqContext?.organizationId;
  },
);
