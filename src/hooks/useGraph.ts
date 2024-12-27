import { SelectedDateContext } from '@/components/calendar/CalendarDateContext';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

export const useGraph = (isMonthSelected: boolean) => {
  const dateContext = useContext(SelectedDateContext);
  const { selectedDate } = dateContext;
  const { year, month, day } = selectedDate;

  // 선택한 날짜 2024-01-01 포맷으로 변경
  const selectedDay = new Date(`${year}-${month}-${day}`);
  const formattedSelectedDay = selectedDay.toISOString().split('T')[0];
  const endDay = new Date(selectedDay);
  endDay.setDate(endDay.getDate() - 30); // 30일 이전 날짜 구하기
  const formattedEndDay = endDay.toISOString().split('T')[0];

  const api = isMonthSelected ? `/api/graph-month` : `/api/graph-day`;

  const { data, isPending, isError } = useQuery({
      queryKey: [api, year, month, day],
      queryFn: async () => {
          const res = await fetch(`${api}?year=${year}&month=${month}&day=${day}&startDay=${formattedSelectedDay}&endDay=${formattedEndDay}`);
          const data = await res.json();
      return data;
    }
  });

  return { data, isPending, isError };
};


