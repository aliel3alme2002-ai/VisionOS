import { BaseQuery } from '../../../../application/common/base/base-query';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class GetOccupancyQuery extends BaseQuery {
  constructor(public readonly zoneId: string, context?: RequestContext) { super(context); }
}
