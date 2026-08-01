import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';
import { UserProfileDto } from '../../../dto/user-profile.dto';

export class UpdateProfileCommand extends BaseCommand {
  constructor(
    public readonly id: string,
    public readonly profile: UserProfileDto,
    context?: RequestContext,
  ) {
    super(context);
  }
}
