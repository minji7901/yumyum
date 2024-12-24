import CalendarDateContext from '@/components/calendar/CalendarDateContext';
import MealCalendarSection from '@/components/calendar/MealCalendarSection';
import React from 'react';

const Calendar = () => {
  return (
    <>
      <h1 className="common-title">ooo님의 식단 달력</h1>
      <CalendarDateContext>
        <MealCalendarSection />
        <div></div>
      </CalendarDateContext>
    </>
  );
};

export default Calendar;
