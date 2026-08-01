import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class DiscoverDevicesCommand extends BaseCommand {
  constructor(public readonly subnet: string, context?: RequestContext) { super(context); }
}
