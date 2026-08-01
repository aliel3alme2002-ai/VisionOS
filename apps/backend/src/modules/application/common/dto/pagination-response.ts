export interface PaginationResponse<T> {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  items: T[];
}
