import { BaseQuery } from '../../../../application/common/base/base-query';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class GetGpuDevicesQuery extends BaseQuery {
  constructor(public readonly runtimeId: string, context?: RequestContext) { super(context); }
}
