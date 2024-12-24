'use client';

import { CalendarDay, genDays } from '@/utils/genCalendarDays';
import Link from 'next/link';
import { useState } from 'react';

interface MealCalendarWeekProps {
  weekInfo: CalendarDay[];
}
const MealCalendarWeek = ({ weekInfo }: MealCalendarWeekProps) => {
  return (
    <div className="h-20 grid grid-cols-7">
      {weekInfo.map((curDay, i) => {
        const { day, kcal } = curDay;
        let textColor = 'text-black';
        if (i === 0) textColor = 'text-red-600';
        if (i === 6) textColor = 'text-blue-600';
        const key = day === null ? i : day + i;
        return (
          <Link key={key} href="/calendar/dailyNutrition/1048385" className="z-10">
            <div className={`${textColor || 'text-black'}`}>
              <div>{day}</div> <div>{kcal}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

interface MealCalendarProps {
  date: {
    year: number;
    month: number;
  };
  handleMonth: (newMonth: number) => void;
}

const MealCalendar = ({ date, handleMonth }: MealCalendarProps) => {
  //요일란은 row가 스타일이 다름
  const { year, month } = date;
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weeks = genDays({ year, month });

  const onPrevMonthClick = () => {
    const newMonth = month === 1 ? 12 : month - 1;
    handleMonth(newMonth);
  };
  const onNextMonthClick = () => {
    const newMonth = month === 12 ? 1 : month + 1;
    handleMonth(newMonth);
  };

  return (
    <div className="w-[50rem] m-auto relative">
      <div className="w-[35rem] h-[30rem] m-auto grid">
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
      </div>
      <div className="w-full h-full absolute top-0 flex justify-between items-center">
        <button type="button" onClick={onPrevMonthClick}>
          {'<'}
        </button>
        <button type="button" onClick={onNextMonthClick}>
          {'>'}
        </button>
      </div>
    </div>
  );
};

const MealCalendarSection = () => {
  const date = new Date();
  const thisYear = date.getFullYear();
  const thisMonth = date.getMonth() + 1;
  const [year, setYear] = useState<number>(thisYear);
  const [month, setMonth] = useState<number>(thisMonth);

  const handleMonth = (newMonth: number) => {
    if (month === 12 && newMonth === 1) setYear((prev) => prev + 1);
    if (month === 1 && newMonth === 12) setYear((prev) => prev - 1);
    setMonth(newMonth);
  };

  return (
    <section>
      <div className="mb-3">
        <h4 className="text-center mb-2 font-bold text-lg">{year}년</h4>
        <h5 className="text-center font-bold text-lg">{month}월</h5>
      </div>
      <MealCalendar date={{ year, month }} handleMonth={handleMonth} />
    </section>
  );
};

export default MealCalendarSection;

//초기에는 오늘 달력 불러오기 - ok
//넘기기 가능하도록 -ok
//스타일 정리 : 경계 그려주기, 좌우 버튼 아이콘 고르기
