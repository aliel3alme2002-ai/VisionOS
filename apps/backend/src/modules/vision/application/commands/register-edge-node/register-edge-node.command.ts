import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';
import { RegisterEdgeNodeDto } from '../../../dto/edge-node.dto';

export class RegisterEdgeNodeCommand extends BaseCommand {
  constructor(public readonly dto: RegisterEdgeNodeDto, context?: RequestContext) { super(context); }
}
