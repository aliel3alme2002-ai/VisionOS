import { BaseQuery } from '../../../../application/common/base/base-query';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class ListPermissionsQuery extends BaseQuery {
  constructor(context?: RequestContext) { super(context); }
}
