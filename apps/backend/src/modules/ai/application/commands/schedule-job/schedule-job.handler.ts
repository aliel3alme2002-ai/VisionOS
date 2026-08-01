import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ScheduleJobCommand } from './schedule-job.command';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { SchedulerJob } from '../../../domain/entities/scheduler-job';
import { randomUUID } from 'crypto';

@CommandHandler(ScheduleJobCommand)
export class ScheduleJobHandler implements BaseCommandHandler<ScheduleJobCommand, SchedulerJob>, ICommandHandler<ScheduleJobCommand> {
  async execute(command: ScheduleJobCommand): Promise<SchedulerJob> {
    return new SchedulerJob({
      id: randomUUID(),
      name: command.dto.name,
      cronExpression: command.dto.cronExpression,
      task: command.dto.task,
    });
  }
}
