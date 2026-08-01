import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class AssignDeploymentSlotCommand extends BaseCommand {
  constructor(public readonly edgeNodeId: string, public readonly slotNumber: number, public readonly runtime: string, context?: RequestContext) { super(context); }
}
