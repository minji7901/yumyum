"use client"

import { useContext } from "react";
import { SelectedDateContext } from "./CalendarDateContext";

const MealCalendarBtn = () => {
  const dateContext = useContext(SelectedDateContext);
  const { selectedDate, handleSelectedDate } = dateContext;
  const { year, month } = selectedDate;

  const onPrevMonthClick = () => {
    const newMonth = month === 1 ? 12 : month - 1;
    const newYear = month === 1 && newMonth === 12 ? year - 1 : year;
    const newDate = { year: newYear, month: newMonth };
    handleSelectedDate(newDate);
  };
  const onNextMonthClick = () => {
    const newMonth = month === 12 ? 1 : month + 1;
    const newYear = month === 12 && newMonth === 1 ? year + 1 : year;
    const newDate = { year: newYear, month: newMonth };
    handleSelectedDate(newDate);
  };
  return (
    <>
      <button type="button" onClick={onPrevMonthClick}>
        {'<'}
      </button>
      <button type="button" onClick={onNextMonthClick}>
        {'>'}
      </button>
    </>
  );
};

export default MealCalendarBtn;