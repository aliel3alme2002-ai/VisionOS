import { BaseQuery } from '../../../../application/common/base/base-query';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class ListCamerasQuery extends BaseQuery {
  constructor(public readonly organizationId: string, public readonly includeDeleted: boolean = false, context?: RequestContext) { super(context); }
}
