export interface SchedulerJobProps {
  id: string;
  name: string;
  cronExpression: string;
  task: string;
  status?: string;
}

export class SchedulerJob {
  public readonly id: string;
  public readonly name: string;
  public readonly cronExpression: string;
  public readonly task: string;
  public status: string;

  constructor(props: SchedulerJobProps) {
    this.id = props.id;
    this.name = props.name;
    this.cronExpression = props.cronExpression;
    this.task = props.task;
    this.status = props.status ?? 'SCHEDULED';
  }
}
