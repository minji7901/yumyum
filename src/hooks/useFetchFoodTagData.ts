import useAuthStore from '@/store/authStore';
import { getFoodTagById } from '@/utils/calendar/fetchCalendarData';
import { useQuery } from '@tanstack/react-query';

const useFetchFoodTagData = (tagId: string) => {
  const { user } = useAuthStore((state) => state);
  const userId = user?.id;

  const { data, isPending, isError } = useQuery({
    queryKey: [`tag-${tagId}-${userId}`],
    queryFn: () => {
      return getFoodTagById(tagId);
    }
  });

  return { data, isPending, isError };
};

export default useFetchFoodTagData;
