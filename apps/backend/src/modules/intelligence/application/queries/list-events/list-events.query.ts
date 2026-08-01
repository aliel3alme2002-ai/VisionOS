import { BaseQuery } from '../../../../application/common/base/base-query';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class ListEventsQuery extends BaseQuery {
  constructor(public readonly cameraId: string, context?: RequestContext) { super(context); }
}
