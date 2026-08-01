import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';
import { OrganizationSettingsDto } from '../../../dto/organization-settings.dto';

export class UpdateSettingsCommand extends BaseCommand {
  constructor(
    public readonly id: string,
    public readonly settings: OrganizationSettingsDto,
    context?: RequestContext,
  ) {
    super(context);
  }
}
