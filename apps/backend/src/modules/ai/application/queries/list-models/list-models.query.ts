import { BaseQuery } from '../../../../application/common/base/base-query';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class ListModelsQuery extends BaseQuery {
  constructor(public readonly organizationId: string, context?: RequestContext) { super(context); }
}
