import { IsNotEmpty, IsString } from 'class-validator';

export class ScheduleJobDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  cronExpression!: string;

  @IsString()
  @IsNotEmpty()
  task!: string;
}
