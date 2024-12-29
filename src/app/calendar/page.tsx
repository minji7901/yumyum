//import CalendarDateContext from '@/components/calendar/CalendarDateContext';
import { Graph } from '@/components/calendar/Graph';
import MealCalendarSection from '@/components/calendar/MealCalendarSection';
import Title from '@/components/Title';
import React from 'react';

const Calendar = () => {
  return (
    <>
      <Title>님의 식단 달력</Title>
      <MealCalendarSection />
      <Graph />
    </>
  );
};

export default Calendar;
