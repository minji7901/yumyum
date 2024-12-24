'use client';
import { createContext, useState } from 'react';
import { SelectedDate, selectedDateInit } from '@/utils/selectedDateInit';

interface SelectedDateType {
  selectedDate: SelectedDate;
  handleSelectedDate: (newDate: SelectedDate) => void;
}
export const SelectedDateContext = createContext<SelectedDateType>({
  selectedDate: { year: 0, month: 0, day: 0 },
  handleSelectedDate: () => {}
});

interface CalendarDateContextProps {
  children: React.ReactNode;
}
const CalendarDateContext = ({ children }: CalendarDateContextProps) => {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(selectedDateInit());

  const handleSelectedDate = (newDate: SelectedDate) => {
    const newDateToSet = { ...selectedDate, ...newDate };
    setSelectedDate(newDateToSet);
  };

  return (
    <>
      <SelectedDateContext.Provider value={{ selectedDate, handleSelectedDate }}>
        {children}
      </SelectedDateContext.Provider>
    </>
  );
};

export default CalendarDateContext;
