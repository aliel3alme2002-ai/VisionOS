import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class RefreshTokenCommand extends BaseCommand {
  constructor(
    public readonly refreshToken: string,
    context?: RequestContext,
  ) {
    super(context);
  }
}
