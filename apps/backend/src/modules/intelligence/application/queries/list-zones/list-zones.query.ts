import { BaseQuery } from '../../../../application/common/base/base-query';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class ListZonesQuery extends BaseQuery {
  constructor(public readonly cameraId: string, context?: RequestContext) { super(context); }
}
