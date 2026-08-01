import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';
import { CreateModelDto } from '../../../dto/create-model.dto';

export class CreateModelCommand extends BaseCommand {
  constructor(public readonly dto: CreateModelDto, context?: RequestContext) { super(context); }
}
