import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';
import { RegisterRuntimeDto } from '../../../dto/register-runtime.dto';

export class RegisterRuntimeCommand extends BaseCommand {
  constructor(public readonly dto: RegisterRuntimeDto, context?: RequestContext) { super(context); }
}
