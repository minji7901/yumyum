import { getCalendarDate, getCalendarMonth } from '@/utils/calendar/getCalendarData';
import { genDays } from '@/utils/genCalendarDays';
import { useQuery } from '@tanstack/react-query';

interface FetchCaloriesPerDayParams {
  year: number;
  month: number;
}
const useFetchMonthlyData = ({ year, month }: FetchCaloriesPerDayParams) => {
  const userId = '19411c9c-bffa-4992-8f55-2c831d9cc941'; // 임시 유저 아이디

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
