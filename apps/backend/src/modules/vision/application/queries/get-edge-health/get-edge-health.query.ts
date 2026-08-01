import { BaseQuery } from '../../../../application/common/base/base-query';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class GetEdgeHealthQuery extends BaseQuery {
  constructor(public readonly edgeNodeId: string, context?: RequestContext) { super(context); }
}
