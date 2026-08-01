import { BaseCommand } from '../../../../application/common/base/base-command';
import { RequestContext } from '../../../../application/common/middleware/request-context';
import { ScheduleJobDto } from '../../../dto/schedule-job.dto';

export class ScheduleJobCommand extends BaseCommand {
  constructor(public readonly dto: ScheduleJobDto, context?: RequestContext) { super(context); }
}
