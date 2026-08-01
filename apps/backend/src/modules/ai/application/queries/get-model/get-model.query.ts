import { BaseQuery } from '../../../../application/common/base/base-query';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class GetModelQuery extends BaseQuery {
  constructor(public readonly id: string, context?: RequestContext) { super(context); }
}
