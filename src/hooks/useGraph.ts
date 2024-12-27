import { SelectedDateContext } from '@/components/calendar/CalendarDateContext';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

export const useGraph = () => {
  const dateContext = useContext(SelectedDateContext);
  const { selectedDate } = dateContext;
  const { year, month, day } = selectedDate;

  const selectedDay = new Date(`${year}-${month}-${day}`);
  const formattedSelectedDay = selectedDay.toISOString().split('T')[0];
  const endDay = new Date(selectedDay);
  endDay.setDate(endDay.getDate() - 30); // 30일 이전 날짜 구하기
  const formattedEndDay = endDay.toISOString().split('T')[0];

  const { data, isPending, isError } = useQuery({
      queryKey: ['graph', year, month, day],
      queryFn: async () => {
          const res = await fetch(`/api/graph?year=${year}&month=${month}&day=${day}&startDay=${formattedSelectedDay}&endDay=${formattedEndDay}`);
          const data = await res.json();
      return data;
    }
  });

  return { data, isPending, isError };
};
