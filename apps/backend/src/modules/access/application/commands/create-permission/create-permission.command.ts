import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';
import { PermissionScopeEnum } from '../../../domain/entities/permission-scope';

export class CreatePermissionCommand extends BaseCommand {
  constructor(
    public readonly resource: string,
    public readonly action: string,
    public readonly scope?: PermissionScopeEnum,
    public readonly description?: string,
    context?: RequestContext,
  ) { super(context); }
}
