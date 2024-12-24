"use client"
import { CalendarDay, genDays } from '@/utils/genCalendarDays';
import { useCallback, useContext } from 'react';
import { SelectedDateContext } from './CalendarDateContext';
import Link from 'next/link';

interface MealCalendarWeekProps {
  weekInfo: CalendarDay[];
}
const MealCalendarWeek = ({ weekInfo }: MealCalendarWeekProps) => {
  const dateContext = useContext(SelectedDateContext);
  const { handleSelectedDate } = dateContext;

  const handleOnDayClick = useCallback((day: number) => {
    handleSelectedDate({ day });
  }, []); //useCallback은 필요한가

  return (
    <div className="h-20 grid grid-cols-7">
      {weekInfo.map((curDay, i) => {
        const { day, kcal } = curDay;
        const key = day === null ? i : day + i;

        //주말은 날짜의 글자 색을 다르게 설정
        let textColor = 'text-black';
        if (i === 0) textColor = 'text-red-600';
        if (i === 6) textColor = 'text-blue-600';

        return (
          <div key={key} className="h-full">
            {day && (
              <div
                className="h-full m-1 relative hover:bg-slate-200 z-[5] hover:cursor-pointer"
                onClick={() => {
                  handleOnDayClick(day);
                }}
              >
                <div className={`${textColor}`}>{day}</div>
                <div className="text-center text-xs">{kcal}kcal</div>
                <Link
                  href="/calendar/dailyNutrition/1048385"
                  className="absolute bold bottom-0 right-0 z-10 hover:text-red-500"
                >
                  +
                </Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const MealCalendarSheet = () => {
  //요일란은 row가 스타일이 다름
  const dateContext = useContext(SelectedDateContext);
  const { selectedDate } = dateContext;
  const { year, month } = selectedDate;

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weeks = genDays({ year, month });

  return (
    <>
      <div className="h-10 grid grid-cols-7">
        {days.map((curDay) => (
          <div key={curDay} className="text-center bg-white">
            {curDay}
          </div>
        ))}
      </div>
      <div className="grid gap-px">
        {weeks.map((curWeekInfo, i) => (
          <MealCalendarWeek key={i} weekInfo={curWeekInfo} />
        ))}
      </div>
    </>
  );
};

export default MealCalendarSheet;