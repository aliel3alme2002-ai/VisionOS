import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';
import { OrganizationBrandingDto } from '../../../dto/organization-branding.dto';

export class UpdateBrandingCommand extends BaseCommand {
  constructor(
    public readonly id: string,
    public readonly branding: OrganizationBrandingDto,
    context?: RequestContext,
  ) {
    super(context);
  }
}
