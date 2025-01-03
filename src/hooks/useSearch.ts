import { FoodType } from '@/types/Food';
import { PaginationType } from '@/types/Pagination';
import { useInfiniteQuery } from '@tanstack/react-query';

interface SearchProps {
  keyword: string;
}

export const useSearch = ({ keyword }: SearchProps) => {
  const fetchData = async ({ pageParam = 1 }) => {
    const res = await fetch(`/api/search?page=${pageParam}&keyword=${encodeURIComponent(keyword)}`);
    const data: PaginationType<FoodType> = await res.json();
    return data;
  };

  const { data, fetchNextPage, hasNextPage, isPending, isError } = useInfiniteQuery({
    queryKey: ['search', keyword],
    queryFn: fetchData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!keyword
  });

  return { data, fetchNextPage, hasNextPage, isPending, isError };
};
