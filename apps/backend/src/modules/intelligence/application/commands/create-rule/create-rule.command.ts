import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';
import { CreateRuleDto } from '../../../dto/create-rule.dto';

export class CreateRuleCommand extends BaseCommand {
  constructor(public readonly dto: CreateRuleDto, context?: RequestContext) { super(context); }
}
