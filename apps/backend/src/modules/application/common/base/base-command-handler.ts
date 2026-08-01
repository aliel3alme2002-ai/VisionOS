import { BaseCommand } from './base-command';

export interface BaseCommandHandler<TCommand extends BaseCommand, TResult = void> {
  execute(command: TCommand): Promise<TResult>;
}
