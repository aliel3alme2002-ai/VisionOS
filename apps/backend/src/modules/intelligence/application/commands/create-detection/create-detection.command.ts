import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';
import { CreateDetectionDto } from '../../../dto/create-detection.dto';

export class CreateDetectionCommand extends BaseCommand {
  constructor(public readonly dto: CreateDetectionDto, context?: RequestContext) { super(context); }
}
