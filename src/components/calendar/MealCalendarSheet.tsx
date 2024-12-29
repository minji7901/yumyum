'use client';
import { CalendarDay } from '@/utils/genCalendarDays';
import { useContext } from 'react';
import { SelectedDateContext } from './CalendarDateContext';
import useFetchMonthlyData from '@/hooks/useFetchMonthlyData';
import { FaPlus } from 'react-icons/fa6';
import Swal from 'sweetalert2';

interface MealCalendarWeekProps {
  weekInfo: CalendarDay[];
}
const MealCalendarWeek = ({ weekInfo }: MealCalendarWeekProps) => {
  const dateContext = useContext(SelectedDateContext);
  const { handleSelectedDate, handleModalVisibility } = dateContext;

  const handleOnDayClick = (day: number) => {
    handleSelectedDate({ day });
  };

  const handleOnModalOpen = () => {
    handleModalVisibility(true);
  };

  return (
    <div className="h-20 grid grid-cols-7">
      {weekInfo.map((curDay, i) => {
        const { day, kcal } = curDay;
        const key = day === null ? i : day + i;

        //주말은 날짜의 글자 색을 다르게 설정
        let textColor = 'text-black';
        if (i === 0) textColor = 'text-red-600';
        if (i === 6) textColor = 'text-blue-600';

        return (
          <div key={key} className="h-full border-b-2 border-gray-200">
            {day && (
              <div
                className="h-[92%] p-2 m-1 relative hover:bg-slate-200 z-[5] hover:cursor-pointer"
                onClick={(e) => {
                  handleOnDayClick(day);
                  if (e.target instanceof HTMLElement && e.target.tagName !== 'BUTTON') {
                    Swal.fire({
                      icon: 'success',
                      text: '날짜가 선택되었습니다'
                    });
                  }
                }}
              >
                <div className={`${textColor}`}>{day}</div>
                <div className="text-center text-xs">{kcal && `${kcal}kcal`}</div>
                <button
                  className="absolute bottom-2 right-2 z-10 text-xs hover:text-red-500"
                  onClick={handleOnModalOpen}
                >
                  <FaPlus />
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const MealCalendarSheet = () => {
  const dateContext = useContext(SelectedDateContext);
  const { selectedDate } = dateContext;
  const { year, month } = selectedDate;
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const { data: weeks, isPending, isError } = useFetchMonthlyData({ year, month });

  if (isPending) return <div className="h-[20vh] flex justify-center items-center">로딩중입니다...</div>;
  if (isError) return <div>Error!</div>;

  return (
    <>
      <div className="h-10 grid grid-cols-7">
        {days.map((curDay) => (
          <div key={curDay} className="text-center bg-white">
            {curDay}
          </div>
        ))}
      </div>
      <div className="grid gap-px">
        {weeks && weeks.map((curWeekInfo, i) => (
          <MealCalendarWeek key={i} weekInfo={curWeekInfo} />
        ))}
      </div>
    </>
  );
};

export default MealCalendarSheet;