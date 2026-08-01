import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class AssignRoleCommand extends BaseCommand {
  constructor(
    public readonly userId: string,
    public readonly roleId: string,
    public readonly organizationId: string,
    public readonly assignedBy: string,
    public readonly expiresAt?: Date,
    context?: RequestContext,
  ) { super(context); }
}
