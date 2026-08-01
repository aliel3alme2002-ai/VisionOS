import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';

export class SyncDeviceCommand extends BaseCommand {
  constructor(public readonly deviceId: string, context?: RequestContext) { super(context); }
}
