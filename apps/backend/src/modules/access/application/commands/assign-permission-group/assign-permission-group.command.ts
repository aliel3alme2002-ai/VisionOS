import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class AssignPermissionGroupCommand extends BaseCommand {
  constructor(
    public readonly groupId: string,
    public readonly roleId: string,
    context?: RequestContext,
  ) { super(context); }
}
