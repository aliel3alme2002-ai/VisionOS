import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class UploadAvatarCommand extends BaseCommand {
  constructor(
    public readonly id: string,
    public readonly storageObjectId: string,
    public readonly thumbnailUrl: string,
    context?: RequestContext,
  ) {
    super(context);
  }
}
