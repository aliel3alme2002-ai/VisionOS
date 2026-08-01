import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class EvaluateRulesCommand extends BaseCommand {
  constructor(public readonly organizationId: string, public readonly detectionId: string, context?: RequestContext) { super(context); }
}
