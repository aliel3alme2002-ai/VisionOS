import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class EdgeHeartbeatCommand extends BaseCommand {
  constructor(public readonly edgeNodeId: string, context?: RequestContext) { super(context); }
}
