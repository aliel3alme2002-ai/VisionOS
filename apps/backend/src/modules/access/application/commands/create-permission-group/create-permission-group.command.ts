import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class CreatePermissionGroupCommand extends BaseCommand {
  constructor(
    public readonly name: string,
    public readonly description?: string,
    public readonly permissionIds?: string[],
    context?: RequestContext,
  ) { super(context); }
}
