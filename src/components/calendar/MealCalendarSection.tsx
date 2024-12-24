'use client'

import { CalendarDay, genDays } from '@/utils/genCalendarDays';
import Link from 'next/link';
import { useContext } from 'react';
import { SelectedDateContext } from './CalendarDateContext';

const MealCalendarBtn = () => {
  const dateContext = useContext(SelectedDateContext);
  const { selectedDate, handleSelectedDate } = dateContext;
  const { year, month } = selectedDate;

  const onPrevMonthClick = () => {
    const newMonth = month === 1 ? 12 : month - 1;
    const newYear = month === 1 && newMonth === 12 ? year - 1 : year;
    const newDate = { ...selectedDate, year: newYear, month: newMonth };
    handleSelectedDate(newDate);
  };
  const onNextMonthClick = () => {
    const newMonth = month === 12 ? 1 : month + 1;
    const newYear = month === 12 && newMonth === 1 ? year + 1 : year;
    const newDate = { ...selectedDate, year: newYear, month: newMonth };
    handleSelectedDate(newDate);
  };
  return (
    <>
      <button type="button" onClick={onPrevMonthClick}>
        {'<'}
      </button>
      <button type="button" onClick={onNextMonthClick}>
        {'>'}
      </button>
    </>
  );
};

interface MealCalendarWeekProps {
  weekInfo: CalendarDay[];
}
const MealCalendarWeek = ({ weekInfo }: MealCalendarWeekProps) => {
  return (
    <div className="h-20 grid grid-cols-7">
      {weekInfo.map((curDay, i) => {
        const { day, kcal } = curDay;
        const key = day === null ? i : day + i;

        let textColor = 'text-black';
        if (i === 0) textColor = 'text-red-600';
        if (i === 6) textColor = 'text-blue-600';

        return (
          <Link key={key} href="/calendar/dailyNutrition/1048385" className="z-10">
            <div className={`${textColor}`}>
              <div>{day}</div> <div>{kcal}</div>
            </div>
          </Link>
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

const MealCalendarSection = () => {
  const dateContext = useContext(SelectedDateContext);
  const { selectedDate } = dateContext;
  const { year, month } = selectedDate;

  return (
    <section>
      <div className="mb-3">
        <h4 className="text-center mb-2 font-bold text-lg">{year}년</h4>
        <h5 className="text-center font-bold text-lg">{month}월</h5>
      </div>
      <div className="w-[50rem] m-auto relative">
        <div className="w-[35rem] h-[30rem] m-auto grid">
          <MealCalendarSheet />
        </div>
        <div className="w-full h-full absolute top-0 flex justify-between items-center">
          <MealCalendarBtn />
        </div>
      </div>
    </section>
  );
};

export default MealCalendarSection;

//스타일 정리 : 경계 그려주기, 좌우 버튼 아이콘 고르기
