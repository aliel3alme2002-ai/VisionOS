import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class UpdatePermissionCommand extends BaseCommand {
  constructor(
    public readonly id: string,
    public readonly description?: string,
    context?: RequestContext,
  ) { super(context); }
}
