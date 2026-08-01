import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';
import { CreateModelVersionDto } from '../../../dto/create-model-version.dto';

export class CreateModelVersionCommand extends BaseCommand {
  constructor(public readonly modelId: string, public readonly dto: CreateModelVersionDto, context?: RequestContext) { super(context); }
}
