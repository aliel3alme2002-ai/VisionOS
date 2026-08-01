import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';
import { CreateCameraGroupDto } from '../../../dto/camera-group.dto';

export class CreateCameraGroupCommand extends BaseCommand {
  constructor(public readonly dto: CreateCameraGroupDto, context?: RequestContext) { super(context); }
}
