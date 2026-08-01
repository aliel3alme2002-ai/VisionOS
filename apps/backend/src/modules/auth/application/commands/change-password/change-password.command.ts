import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class ChangePasswordCommand extends BaseCommand {
  constructor(
    public readonly userId: string,
    public readonly oldPassword: string,
    public readonly newPassword: string,
    context?: RequestContext,
  ) {
    super(context);
  }
}
