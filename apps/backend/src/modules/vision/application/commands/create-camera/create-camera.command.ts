import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';
import { CreateCameraDto } from '../../../dto/create-camera.dto';

export class CreateCameraCommand extends BaseCommand {
  constructor(public readonly dto: CreateCameraDto, context?: RequestContext) { super(context); }
}
