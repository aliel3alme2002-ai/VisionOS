import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';
import { UpdateModelDto } from '../../../dto/update-model.dto';

export class UpdateModelCommand extends BaseCommand {
  constructor(public readonly id: string, public readonly dto: UpdateModelDto, context?: RequestContext) { super(context); }
}
