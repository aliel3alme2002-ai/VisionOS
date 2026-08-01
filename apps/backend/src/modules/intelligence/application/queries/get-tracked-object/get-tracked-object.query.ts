import { BaseQuery } from '../../../../application/common/base/base-query';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class GetTrackedObjectQuery extends BaseQuery {
  constructor(public readonly trackingId: string, context?: RequestContext) { super(context); }
}
