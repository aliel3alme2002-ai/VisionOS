import { Injectable } from '@nestjs/common';
import { BaseQuery } from '../base/base-query';
import { BaseQueryHandler } from '../base/base-query-handler';

export type QueryType<T extends BaseQuery> = new (...args: unknown[]) => T;

@Injectable()
export class QueryBus {
  private readonly handlers = new Map<string, BaseQueryHandler<BaseQuery, unknown>>();

  public register<TQuery extends BaseQuery, TResult>(
    queryCls: QueryType<TQuery>,
    handler: BaseQueryHandler<TQuery, TResult>,
  ): void {
    this.handlers.set(queryCls.name, handler as BaseQueryHandler<BaseQuery, unknown>);
  }

  public async execute<TQuery extends BaseQuery, TResult>(
    query: TQuery,
  ): Promise<TResult> {
    const queryName = query.constructor.name;
    const handler = this.handlers.get(queryName);
    if (!handler) {
      throw new Error(`No handler registered for query: ${queryName}`);
    }
    return (await handler.execute(query)) as TResult;
  }
}
