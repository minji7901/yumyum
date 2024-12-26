import { FoodType } from '@/types/Food';
import { useInfiniteQuery } from '@tanstack/react-query';

interface SearchProps {
  keyword: string;
}

interface PageProps {
  pageParam?: number;
}

interface ResultType {
  data: FoodType[];
  nextPage: number;
  hasMore: boolean;
}

export const useSearch = ({ keyword }: SearchProps) => {
  const { data, fetchNextPage, hasNextPage, isPending, isError } = useInfiniteQuery<ResultType, Error>({
    queryKey: ['search', keyword],
    queryFn: async ({ pageParam = 1 }: PageProps) => {
      const res = await fetch(`/api/search?page=${pageParam}&keyword=${encodeURIComponent(keyword)}`);
      const data: ResultType = await res.json();
      return data;
    },
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextPage : undefined)
  });

  return { data, fetchNextPage, hasNextPage, isPending, isError };
};
