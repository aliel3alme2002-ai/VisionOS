import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class UpdateUserCommand extends BaseCommand {
  constructor(
    public readonly id: string,
    public readonly displayName?: string,
    context?: RequestContext,
  ) {
    super(context);
  }
}
