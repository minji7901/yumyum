import { SelectedDateContext } from '@/components/calendar/CalendarDateContext';
import useAuthStore from '@/store/authStore';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

export const useGraph = (isMonthSelected: boolean) => {
  const dateContext = useContext(SelectedDateContext);
  const { selectedDate } = dateContext;
  const { year, month, day } = selectedDate;
  const { user } = useAuthStore();

  // 선택한 날짜 2024-01-01 포맷으로 변경
  const selectedDay = new Date(`${year}-${month}-${day}`);
  const kstOffset = 9 * 60; // 9시간(분)
  const kstDate = new Date(selectedDay.getTime() + kstOffset * 60 * 1000);
  const formattedSelectedDay = kstDate.toISOString().split('T')[0];
  // 30일 이전 날짜 구하기
  const thirtyDaysInMillis = 30 * 24 * 60 * 60 * 1000;
  const endDay = new Date(selectedDay.getTime() + kstOffset * 60 * 1000 - thirtyDaysInMillis);
  const formattedEndDay = endDay.toISOString().split('T')[0];

  const api = isMonthSelected ? `/api/graph-month` : `/api/graph-day`;

  const { data, isPending, isError } = useQuery({
    queryKey: [api, year, month, day, user?.id],
    queryFn: async () => {
      const res = await fetch(
        `${api}?year=${year}&month=${month}&day=${day}&startDay=${formattedSelectedDay}&endDay=${formattedEndDay}`
      );
      const data = await res.json();
      return data;
    }
  });

  return { data, isPending, isError };
};
