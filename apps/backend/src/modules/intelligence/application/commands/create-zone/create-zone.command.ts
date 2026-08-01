import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';
import { CreateZoneDto } from '../../../dto/create-zone.dto';

export class CreateZoneCommand extends BaseCommand {
  constructor(public readonly dto: CreateZoneDto, context?: RequestContext) { super(context); }
}
