import { BaseQuery } from '../../../../application/common/base/base-query';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class GetZoneQuery extends BaseQuery {
  constructor(public readonly id: string, context?: RequestContext) { super(context); }
}
