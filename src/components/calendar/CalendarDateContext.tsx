'use client';
import { createContext, useState } from 'react';
import { SelectedDate, selectedDateInit } from '@/utils/calendar/selectedDateInit';

interface NewlySelectedDate {
  year?: number;
  month?: number;
  day?: number;
}
interface SelectedDateType {
  modalVisibility: boolean;
  selectedDate: SelectedDate;
  handleSelectedDate: (newDate: NewlySelectedDate) => void;
  handleModalVisibility: (bool:boolean) => void;
}
export const SelectedDateContext = createContext<SelectedDateType>({
  modalVisibility: false,
  selectedDate: { year: 0, month: 0, day: 0 },
  handleSelectedDate: () => {},
  handleModalVisibility: () =>{},
});

interface CalendarDateContextProps {
  children: React.ReactNode;
}
const CalendarDateContext = ({ children }: CalendarDateContextProps) => {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(selectedDateInit());
  const [modalVisibility, setModalvisibility] = useState<boolean>(false);

  const handleSelectedDate = (newDate: NewlySelectedDate) => {
    const newDateToSet = { ...selectedDate, ...newDate };
    console.log(selectedDate, newDateToSet);
    setSelectedDate(newDateToSet);
  };

  const handleModalVisibility = (bool:boolean)=>{
    setModalvisibility(bool);
  }

  return (
    <>
      <SelectedDateContext.Provider value={{ modalVisibility, selectedDate, handleSelectedDate, handleModalVisibility }}>
        {children}
      </SelectedDateContext.Provider>
    </>
  );
};

export default CalendarDateContext;
