'use client';

import AddNewFood from '@/components/calendar/AddNewFood';
import { SelectedDateContext } from '@/components/calendar/CalendarDateContext';
import FoodTagBox from '@/components/calendar/FoodTagBox';
import ShowDailyMealData from '@/components/calendar/ShowDailyMealData';
import { useContext, useRef, useState } from 'react';

const Modal = () => {
  const dateContext = useContext(SelectedDateContext);
  const { modalVisibility, handleModalVisibility } = dateContext;
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [modalMode, setModalMode] = useState('ShowData');

  const [selectedFoodTag, setSelectedFoodTag] = useState<string|null>(null);

  const onClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) handleModalVisibility(false);
  };

  const onModalModeSwitch = () => {
    const switchTo = modalMode === 'ShowData' ? 'addData' : 'ShowData';
    setModalMode(switchTo);
  };

  if (!modalVisibility) return null;

  return (
    <div
      onClick={(e) => {
        onClickOutside(e);
      }}
      className="w-screen h-screen fixed flex justify-center top-0 left-0 bg-[rgba(0,0,0,0.6)] z-[15]"
    >
      <div ref={modalRef} className="relative m-auto w-[40vw] h-[90vh] rounded-3xl bg-white z-[20]">
        <div className="my-8 mx-4">
          <h2 className="mb-3 text-2xl font-bold text-center">식품 추가</h2>
          <FoodTagBox
            modalMode={modalMode}
            onModalModeSwitch={onModalModeSwitch}
            setSelectedFoodTag={setSelectedFoodTag}
          />
          {modalMode === 'ShowData' ? (
            <ShowDailyMealData selectedFoodTag={selectedFoodTag} />
          ) : (
            <AddNewFood onModalModeSwitch={onModalModeSwitch} />
          )}
        </div>
      </div>
    </div>
  );
};
export default Modal;
