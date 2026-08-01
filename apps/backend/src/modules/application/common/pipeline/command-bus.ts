import { Injectable } from '@nestjs/common';
import { BaseCommand } from '../base/base-command';
import { BaseCommandHandler } from '../base/base-command-handler';

export type CommandType<T extends BaseCommand> = new (...args: unknown[]) => T;

@Injectable()
export class CommandBus {
  private readonly handlers = new Map<string, BaseCommandHandler<BaseCommand, unknown>>();

  public register<TCommand extends BaseCommand, TResult>(
    commandCls: CommandType<TCommand>,
    handler: BaseCommandHandler<TCommand, TResult>,
  ): void {
    this.handlers.set(commandCls.name, handler as BaseCommandHandler<BaseCommand, unknown>);
  }

  public async execute<TCommand extends BaseCommand, TResult>(
    command: TCommand,
  ): Promise<TResult> {
    const commandName = command.constructor.name;
    const handler = this.handlers.get(commandName);
    if (!handler) {
      throw new Error(`No handler registered for command: ${commandName}`);
    }
    return (await handler.execute(command)) as TResult;
  }
}
