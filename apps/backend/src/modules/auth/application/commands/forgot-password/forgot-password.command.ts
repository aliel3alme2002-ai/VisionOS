import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class ForgotPasswordCommand extends BaseCommand {
  constructor(
    public readonly email: string,
    context?: RequestContext,
  ) {
    super(context);
  }
}
