import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';
import { CreatePipelineDto } from '../../../dto/create-pipeline.dto';

export class CreatePipelineCommand extends BaseCommand {
  constructor(public readonly dto: CreatePipelineDto, context?: RequestContext) { super(context); }
}
