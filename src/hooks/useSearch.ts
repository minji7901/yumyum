import { SearchType } from '@/types/Search';
import { useQuery } from '@tanstack/react-query';

export const useSearch = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['search'],
    queryFn: async () => {
      const res = await fetch('/api/search');
      const data: SearchType = await res.json();
      return data;
    }
  });

  return { data, isPending, isError };
};
