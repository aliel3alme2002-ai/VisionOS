import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class CreateUserCommand extends BaseCommand {
  constructor(
    public readonly organizationId: string,
    public readonly email: string,
    public readonly displayName: string,
    context?: RequestContext,
  ) {
    super(context);
  }
}
