import { BaseQuery } from '../../../../application/common/base/base-query';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class MeQuery extends BaseQuery {
  constructor(
    public readonly userId: string,
    context?: RequestContext,
  ) {
    super(context);
  }
}
