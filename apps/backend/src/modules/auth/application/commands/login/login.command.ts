import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class LoginCommand extends BaseCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    context?: RequestContext,
  ) {
    super(context);
  }
}
