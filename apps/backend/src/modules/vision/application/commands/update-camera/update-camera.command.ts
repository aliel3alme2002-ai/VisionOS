import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';
import { UpdateCameraDto } from '../../../dto/update-camera.dto';

export class UpdateCameraCommand extends BaseCommand {
  constructor(public readonly id: string, public readonly dto: UpdateCameraDto, context?: RequestContext) { super(context); }
}
