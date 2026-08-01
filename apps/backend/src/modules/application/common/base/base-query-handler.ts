import { BaseQuery } from './base-query';

export interface BaseQueryHandler<TQuery extends BaseQuery, TResult = unknown> {
  execute(query: TQuery): Promise<TResult>;
}
