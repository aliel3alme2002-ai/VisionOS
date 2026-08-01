import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class AcceptInvitationCommand extends BaseCommand {
  constructor(
    public readonly userId: string,
    public readonly displayName?: string,
    context?: RequestContext,
  ) {
    super(context);
  }
}
