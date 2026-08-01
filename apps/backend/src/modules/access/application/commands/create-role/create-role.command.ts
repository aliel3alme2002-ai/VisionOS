import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class CreateRoleCommand extends BaseCommand {
  constructor(
    public readonly name: string,
    public readonly organizationId?: string | null,
    public readonly description?: string,
    public readonly parentRoleId?: string,
    public readonly permissionIds?: string[],
    context?: RequestContext,
  ) { super(context); }
}
