import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';
import { CreateDeploymentDto } from '../../../dto/create-deployment.dto';

export class CreateDeploymentCommand extends BaseCommand {
  constructor(public readonly dto: CreateDeploymentDto, context?: RequestContext) { super(context); }
}
