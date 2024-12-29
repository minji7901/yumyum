import useAuthStore from '@/store/authStore';
import { getFoodTags } from '@/utils/calendar/fetchCalendarData';
import { useQuery } from '@tanstack/react-query';

interface FetchCaloriesPerDayParams {
  year: number;
  month: number;
  day: number;
}
const useFetchDailyFoodTags = ({ year, month, day }: FetchCaloriesPerDayParams) => {
  const { user } = useAuthStore((state) => state);
  const userId = user?.id;

  const { data, isPending, isError } = useQuery({
    queryKey: [`tags-${year}-${month}-${day}-${userId}`],
    queryFn: async () => {
      return await getFoodTags({ year, month, day, userId });
    }
  });

  return { data, isPending, isError };
};

export default useFetchDailyFoodTags;
