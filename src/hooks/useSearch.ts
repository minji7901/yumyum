import { SearchType } from '@/types/Search';
import { useQuery } from '@tanstack/react-query';

interface SearchProps {
  keyword: string;
}

export const useSearch = ({ keyword }: SearchProps) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['search', keyword],
    queryFn: async () => {
      const res = await fetch(`/api/search?keyword=${encodeURIComponent(keyword)}`);
      const data: SearchType = await res.json();
      return data;
    }
  });

  return { data, isPending, isError };
};
