import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class CreateOrganizationCommand extends BaseCommand {
  constructor(
    public readonly name: string,
    public readonly ownerId: string,
    public readonly slug?: string,
    public readonly description?: string,
    context?: RequestContext,
  ) {
    super(context);
  }
}
