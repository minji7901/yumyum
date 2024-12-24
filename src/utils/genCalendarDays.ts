export interface GenDaysParams {
  year: number;
  month: number;
}
export interface CalendarDay {
  day: number | null;
  kcal: number | null;
}

export const genDays = ({ year, month }: GenDaysParams): CalendarDay[][] => {
  const firstDay = (new Date(year, month - 1).getDay() + 6) % 7;
  const lastDate = new Date(year, month, 0).getDate();

  const dates: CalendarDay[] = Array.from({ length: 42 }, () => {
    return { day: null, kcal: null };
  });

  for (let i = firstDay + 1; i <= firstDay + lastDate; i++) {
    dates[i].day = i - firstDay;
  }

  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < dates.length; i += 7) {
    const week = dates.slice(i, i + 7);
    weeks.push(week);
  }

  //첫주 혹은 마지막주가 비어있다면 삭제
  const lastDayOfFirstWeek = weeks[0][6].day;
  const firstDayOfLastWeek = weeks[weeks.length-1][0].day;
  if (firstDayOfLastWeek === null) weeks.pop();
  if (lastDayOfFirstWeek === null) weeks.shift();

  return weeks;
}
