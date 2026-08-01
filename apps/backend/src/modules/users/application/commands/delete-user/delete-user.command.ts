import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class DeleteUserCommand extends BaseCommand {
  constructor(public readonly id: string, context?: RequestContext) { super(context); }
}
