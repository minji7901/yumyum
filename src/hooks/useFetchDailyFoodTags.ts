import { getFoodTagById, getFoodTags } from '@/utils/calendar/getCalendarData';
import { useQuery } from '@tanstack/react-query';

interface FetchCaloriesPerDayParams {
  year: number;
  month: number;
  day: number;
}
const useFetchDailyFoodTags = ({ year, month, day }: FetchCaloriesPerDayParams) => {
  const userId = '19411c9c-bffa-4992-8f55-2c831d9cc941'; // 임시 유저 아이디

  const { data, isPending, isError } = useQuery({
    queryKey: [`tags-${year}-${month}-${day}-${userId}`],
    queryFn: () => {
      return getFoodTags({ year, month, day, userId });
    }
  });

  return { data, isPending, isError };
};

export default useFetchDailyFoodTags;
