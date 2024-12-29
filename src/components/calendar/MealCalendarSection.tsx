'use client';

import { useContext } from 'react';
import { SelectedDateContext } from './CalendarDateContext';
import MealCalendarSheet from './MealCalendarSheet';
import MealCalendarBtn from './MealCalendarBtn';

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
      <div className="w-full m-auto relative">
        <div className="w-10/12 m-auto">
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
