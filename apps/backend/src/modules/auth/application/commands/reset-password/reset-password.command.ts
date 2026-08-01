import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class ResetPasswordCommand extends BaseCommand {
  constructor(
    public readonly token: string,
    public readonly newPassword: string,
    context?: RequestContext,
  ) {
    super(context);
  }
}
