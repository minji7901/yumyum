import { SearchType } from '@/types/Search';
import { useQuery } from '@tanstack/react-query';

interface SearchProps {
  keyword: string;
}

export const useSearch = ({ keyword }: SearchProps) => {
  const fetchData = async () => {
    const res = await fetch(`/api/search?keyword=${encodeURIComponent(keyword)}`);
    const data: SearchType = await res.json();
    return data;
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ['search', keyword],
    queryFn: fetchData,
    enabled: !!keyword
  });

  return { data, isPending, isError };
};
