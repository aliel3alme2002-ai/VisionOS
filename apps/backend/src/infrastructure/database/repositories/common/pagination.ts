export interface OffsetPaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filter?: Record<string, unknown>;
}

export interface CursorPaginationParams {
  cursor?: string;
  limit?: number;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page?: number;
  limit: number;
  totalPages?: number;
  nextCursor?: string | null;
}

export class PaginationHelper {
  public static calculateOffset(page = 1, limit = 10): { skip: number; take: number } {
    const validPage = Math.max(1, page);
    const validLimit = Math.max(1, Math.min(100, limit));
    return {
      skip: (validPage - 1) * validLimit,
      take: validLimit,
    };
  }
}
