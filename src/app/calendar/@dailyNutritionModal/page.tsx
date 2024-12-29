'use client';

import AddNewFood from '@/components/calendar/AddNewFood';
import { SelectedDateContext } from '@/components/calendar/CalendarDateContext';
import FoodTagBox from '@/components/calendar/FoodTagBox';
import ShowDailyMealData from '@/components/calendar/ShowDailyMealData';
import { useContext, useRef, useState } from 'react';

type ModalModeType = 'showData' | 'addData';

const Modal = () => {
  const { modalVisibility, handleModalVisibility } = useContext(SelectedDateContext);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [modalMode, setModalMode] = useState<ModalModeType>('showData');

  //태그 데이터 갯수로 캘린더 없음과 있음을을 판단할 수 있다.
  const [howManyTags, setHowManyTags] = useState<number>(0);

  const [selectedFoodTag, setSelectedFoodTag] = useState<string>('');

  const onClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleModalVisibility(false);
      setSelectedFoodTag('');
      setHowManyTags(0);
    }
  };

  const onModalModeSwitch = () => {
    const switchTo = modalMode === 'showData' ? 'addData' : 'showData';
    setModalMode(switchTo);
  };

  if (!modalVisibility) return null;

  return (
    <div
      onClick={(e) => {
        onClickOutside(e);
      }}
      className="w-screen h-screen fixed flex justify-center items-end top-0 left-0 bg-[rgba(0,0,0,0.6)] z-[15]"
    >
      <div
        ref={modalRef}
        className="overflow-scroll relative my-6 max-w-[500px] w-[calc(100vw-48px)] h-[calc(100vh-128px)] rounded-3xl bg-white z-[20]"
      >
        <div className="relative my-8 mx-4">
          <h2 className="mb-3 text-2xl font-bold text-center">식품 추가</h2>
          <FoodTagBox
            modalMode={modalMode}
            onModalModeSwitch={onModalModeSwitch}
            setSelectedFoodTag={setSelectedFoodTag}
            setHowManyTags={setHowManyTags}
          />
          {modalMode === 'showData' ? (
            <ShowDailyMealData
              selectedFoodTag={selectedFoodTag}
              howManyTags={howManyTags}
              setHowManyTags={setHowManyTags}
            />
          ) : (
            <AddNewFood
              onModalModeSwitch={onModalModeSwitch}
              howManyTags={howManyTags}
              setHowManyTags={setHowManyTags}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Modal;
