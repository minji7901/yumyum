import { getFoodTagById } from '@/utils/calendar/getCalendarData';
import { useQuery } from '@tanstack/react-query';

const useFetchFoodTagData = (tagId: string) => {
  const userId = '19411c9c-bffa-4992-8f55-2c831d9cc941'; // 임시 유저 아이디

  const { data, isPending, isError } = useQuery({
    queryKey: [`tag-${tagId}-${userId}`],
    queryFn: () => {
      return getFoodTagById(tagId);
    }
  });

  return { data, isPending, isError };
};

export default useFetchFoodTagData;
