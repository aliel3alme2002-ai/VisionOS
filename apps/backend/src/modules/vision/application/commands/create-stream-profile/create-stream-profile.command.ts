import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';
import { CreateStreamProfileDto } from '../../../dto/stream-profile.dto';

export class CreateStreamProfileCommand extends BaseCommand {
  constructor(public readonly dto: CreateStreamProfileDto, context?: RequestContext) { super(context); }
}
