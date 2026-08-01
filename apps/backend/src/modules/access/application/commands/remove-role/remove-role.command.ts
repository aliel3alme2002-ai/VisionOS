import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class RemoveRoleCommand extends BaseCommand {
  constructor(
    public readonly userId: string,
    public readonly roleId: string,
    public readonly organizationId: string,
    context?: RequestContext,
  ) { super(context); }
}
