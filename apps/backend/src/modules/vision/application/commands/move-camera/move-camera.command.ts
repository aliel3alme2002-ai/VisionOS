import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class MoveCameraCommand extends BaseCommand {
  constructor(public readonly cameraId: string, public readonly targetEdgeNodeId: string | null, context?: RequestContext) { super(context); }
}
