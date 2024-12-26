import { getCalendarDate } from '@/utils/calendar/getCalendarData';
import { useQuery } from '@tanstack/react-query';

interface FetchCaloriesPerDayParams {
  year: number;
  month: number;
  day: number;
}
const useFetchDailyFoodConsumption = ({ year, month, day }: FetchCaloriesPerDayParams) => {
  const userId = '19411c9c-bffa-4992-8f55-2c831d9cc941'; // 임시 유저 아이디

  const { data, isPending, isError } = useQuery({
    queryKey: [`${year}-${month}-${day}-${userId}`],
    queryFn: () => {
      return getCalendarDate({ year, month, day, userId });
    }
  });

  return { foodConsumption: data, isPending, isError };
};

export default useFetchDailyFoodConsumption;
