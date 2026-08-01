import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';
import { UserPreferencesDto } from '../../../dto/user-preferences.dto';

export class UpdatePreferencesCommand extends BaseCommand {
  constructor(
    public readonly id: string,
    public readonly preferences: UserPreferencesDto,
    context?: RequestContext,
  ) {
    super(context);
  }
}
