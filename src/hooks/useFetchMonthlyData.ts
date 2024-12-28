import useAuthStore from '@/store/authStore';
import { getCalendarMonth } from '@/utils/calendar/fetchCalendarData';
import { genDays } from '@/utils/genCalendarDays';
import { useQuery } from '@tanstack/react-query';

interface FetchCaloriesPerDayParams {
  year: number;
  month: number;
}
const useFetchMonthlyData = ({ year, month }: FetchCaloriesPerDayParams) => {
  const { user } = useAuthStore((state) => state);
  const userId = user?.id;

  const { data, isPending, isError } = useQuery({
    queryKey: [`monthlyData-${year}-${month}-${userId}`],
    queryFn: async () => {
      const weeks = genDays({ year, month });
      const monthData = await getCalendarMonth({ year, month, userId });
      if (!monthData) return;
      monthData.forEach((curDay) => {
        const { day, total_calories: totalCalories } = curDay;
        //일일 총 칼로리 섭취 정보 추가
        weeks.forEach((week) => {
          week.forEach((date) => {
            if (date.day === day) {
              date.kcal = totalCalories;
            }
          });
        });
      });
      return weeks;
    }
  });

  return { data, isPending, isError };
};

export default useFetchMonthlyData;
