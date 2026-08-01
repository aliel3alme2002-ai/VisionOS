import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class UpdateRoleCommand extends BaseCommand {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly description?: string | null,
    public readonly permissionIds?: string[],
    context?: RequestContext,
  ) { super(context); }
}
