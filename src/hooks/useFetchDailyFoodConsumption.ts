import useAuthStore from '@/store/authStore';
import { getCalendarDate } from '@/utils/calendar/fetchCalendarData';
import { useQuery } from '@tanstack/react-query';

interface FetchCaloriesPerDayParams {
  year: number;
  month: number;
  day: number;
}
const useFetchDailyFoodConsumption = ({ year, month, day }: FetchCaloriesPerDayParams) => {
  const { user } = useAuthStore((state) => state);
  const userId = user?.id;

  const { data, isPending, isError } = useQuery({
    queryKey: [`${year}-${month}-${day}-${userId}`],
    queryFn: () => {
      return getCalendarDate({ year, month, day, userId });
    }
  });

  return { data, isPending, isError };
};

export default useFetchDailyFoodConsumption;
