import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';
import { OrganizationLimitsDto } from '../../../dto/organization-limits.dto';

export class UpdateLimitsCommand extends BaseCommand {
  constructor(
    public readonly id: string,
    public readonly limits: OrganizationLimitsDto,
    context?: RequestContext,
  ) {
    super(context);
  }
}
