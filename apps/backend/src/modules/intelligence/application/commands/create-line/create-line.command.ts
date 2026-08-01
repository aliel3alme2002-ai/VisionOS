import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';
import { CreateLineDto } from '../../../dto/create-line.dto';

export class CreateLineCommand extends BaseCommand {
  constructor(public readonly dto: CreateLineDto, context?: RequestContext) { super(context); }
}
