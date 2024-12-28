export interface PageProps {
  pageParam?: number;
}

export interface PaginationType<T> {
  data: T[];
  nextPage: number;
  hasMore: boolean;
}
