import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class UpdateRuleCommand extends BaseCommand {
  constructor(public readonly id: string, public readonly enabled?: boolean, context?: RequestContext) { super(context); }
}
