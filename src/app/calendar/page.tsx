//import CalendarDateContext from '@/components/calendar/CalendarDateContext';
import { Graph } from '@/components/calendar/Graph';
import MealCalendarSection from '@/components/calendar/MealCalendarSection';
import React from 'react';

const Calendar = () => {
  return (
    <>
      <h1 className="common-title">ooo님의 식단 달력</h1>
        <MealCalendarSection />
        <Graph />
    </>
  );
};

export default Calendar;