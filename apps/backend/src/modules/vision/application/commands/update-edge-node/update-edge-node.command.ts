import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class UpdateEdgeNodeCommand extends BaseCommand {
  constructor(public readonly id: string, public readonly name?: string, context?: RequestContext) { super(context); }
}
