import { BaseQuery } from '../../../../application/common/base/base-query';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class GetHeatmapQuery extends BaseQuery {
  constructor(public readonly cameraId: string, public readonly timeRange: string = '24h', context?: RequestContext) { super(context); }
}
