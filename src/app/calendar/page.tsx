
import { Graph } from '@/components/calendar/graph';
import MealCalendar from '@/components/calendar/MealCalendarSection'
import React from 'react'

const Calendar = () => {
  return (
    <>
      <h1 className="common-title">ooo님의 식단 달력</h1>
      <MealCalendar />
      <div>
      <Graph />
      </div>
    </>
  );
}

export default Calendar
