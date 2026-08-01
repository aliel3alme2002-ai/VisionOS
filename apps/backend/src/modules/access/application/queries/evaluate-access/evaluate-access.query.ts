import { BaseQuery } from '../../../../application/common/base/base-query';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class EvaluateAccessQuery extends BaseQuery {
  constructor(
    public readonly userId: string,
    public readonly organizationId: string,
    public readonly requiredPermission: string,
    public readonly resourceOwnerId?: string,
    context?: RequestContext,
  ) { super(context); }
}
