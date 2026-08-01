export type SortDirection = 'ASC' | 'DESC';

export interface SortRequest {
  field: string;
  direction: SortDirection;
}
