import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class LogoutCommand extends BaseCommand {
  constructor(
    public readonly userId: string,
    public readonly refreshToken?: string,
    context?: RequestContext,
  ) {
    super(context);
  }
}
