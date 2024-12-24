'use client';
import { createContext, useState } from 'react';
import { SelectedDate, selectedDateInit } from '@/utils/selectedDateInit';

interface NewlySelectedDate {
  year?: number;
  month?: number;
  day?: number;
}
interface SelectedDateType {
  selectedDate: SelectedDate;
  handleSelectedDate: (newDate: NewlySelectedDate) => void;
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

  const handleSelectedDate = (newDate: NewlySelectedDate) => {
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
