//import CalendarDateContext from '@/components/calendar/CalendarDateContext';
import { Graph } from '@/components/calendar/Graph';
import MealCalendarSection from '@/components/calendar/MealCalendarSection';
import Title from '@/components/Title';
import React from 'react';
import { Metadata } from 'next';

// Metadata
export const metadata: Metadata = {
  title: '식단 달력 | Yumyumlog',
  description: '일간/월간 식단을 관리하고 나에게 필요한 영양소를 채워보세요!',
  keywords: ['식단 관리', '영양 관리', '영양 성분 분석', 'Yumyum']
};

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
