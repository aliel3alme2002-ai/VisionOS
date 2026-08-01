export type FilterOperator =
  | 'eq'
  | 'neq'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'contains'
  | 'in'
  | 'nin';

export interface FilterRequest<T = unknown> {
  field: string;
  operator: FilterOperator;
  value: T;
}
