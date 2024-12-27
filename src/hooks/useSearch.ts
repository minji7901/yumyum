import { FoodType } from '@/types/Food';
import { PageProps, PaginationType } from '@/types/Pagination';
import { useInfiniteQuery } from '@tanstack/react-query';

interface SearchProps {
  keyword: string;
}

export const useSearch = ({ keyword }: SearchProps) => {
  const fetchData = async ({ pageParam = 1 }: PageProps) => {
    const res = await fetch(`/api/search?page=${pageParam}&keyword=${encodeURIComponent(keyword)}`);
    const data: PaginationType<FoodType> = await res.json();
    return data;
  };

  const { data, fetchNextPage, hasNextPage, isPending, isError } = useInfiniteQuery<PaginationType<FoodType>, Error>({
    queryKey: ['search', keyword],
    queryFn: fetchData,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextPage : undefined),
    enabled: !!keyword
  });

  return { data, fetchNextPage, hasNextPage, isPending, isError };
};
