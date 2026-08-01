import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';
import { OrganizationFeaturesDto } from '../../../dto/organization-features.dto';

export class UpdateFeaturesCommand extends BaseCommand {
  constructor(
    public readonly id: string,
    public readonly features: OrganizationFeaturesDto,
    context?: RequestContext,
  ) {
    super(context);
  }
}
