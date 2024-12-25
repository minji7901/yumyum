'use client';

import { SelectedDateContext } from '@/components/calendar/CalendarDateContext';
import { useContext, useRef} from 'react';

const FoodTagBox = () => {
  //모드에 따라 다른 버튼 아이콘 보여주기
  //스크롤 넣기
  return (
    <section className="border-b">
      <div className="relative m-auto mb-4 w-4/5 min-h-28 border border-primary rounded-xl">
        <div className="p-4 flex flex-wrap gap-2">
          <button type="button" className="px-2 py-0.5 border-2 border-primary rounded-lg text-sm">
            식품이름
          </button>
          <button type="button" className="px-2 py-0.5 border-2 border-primary rounded-lg text-sm">
            식품이름이름이름이름
          </button>
          <button type="button" className="px-2 py-0.5 border-2 border-primary rounded-lg text-sm">
            식품이름이름
          </button>
          <button type="button" className="px-2 py-0.5 border-2 border-primary rounded-lg text-sm">
            식품이름이 x2
          </button>
        </div>
        <button type="button" className="absolute bottom-2 right-2 text-bold hover:text-primary">
          +
        </button>
      </div>
    </section>
  );
};

const FoodUnselected = () => {
  return (
    <>
      {' '}
      <div>아직 선택한 음식이 없어요</div>{' '}
    </>
  );
};

const FoodInfo = () => {
  const selectedFood = true;
  return (
    <div className="py-10 border-b">
      {selectedFood ? (
        <>
          <h3 className="text-xl font-bold text-center">식품이름이름이름</h3>
          <h4 className="text-lg font-bold text-center text-gray-400">0000kcal</h4>
          <h4 className="text-xs font-bold text-center text-gray-400">1인분 000g</h4>
          <table className="m-auto mb-6">
            <tr>
              <td className="text-right">탄수화물</td>
              <td className="px-4 text-left">000g</td>
            </tr>
            <tr>
              <td className="text-right">단백질</td>
              <td className="px-4 text-left">000g</td>
            </tr>
            <tr>
              <td className="text-right">지방</td>
              <td className="px-4 text-left">000g</td>
            </tr>
            <tr>
              <td className="text-right">당류</td>
              <td className="px-4 text-left">000g</td>
            </tr>
            <tr>
              <td className="text-right">나트륨</td>
              <td className="px-4 text-left">000g</td>
            </tr>
          </table>
          <button type="button" className="m-auto common-btn px-2 py-1">
            삭제
          </button>
        </>
      ) : (
        <FoodUnselected />
      )}
    </div>
  );
};

const ShowDailyMealData = () => {
  return (
    <>
      <FoodInfo />
      <h3 className="text-xl font-bold text-center">N월 N일의 하루 섭취 영양</h3>
      <div className="text-3xl font-bold text-center text-[#da6b5d]">0000kcal</div>
    </>
  );
};

const Modal = () => {
  const dateContext = useContext(SelectedDateContext);
  const { modalVisibility, handleModalVisibility } = dateContext;
  const modalRef = useRef<HTMLDivElement | null>(null);
  const onClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) handleModalVisibility(false);
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
        <h2 className="text-2xl font-bold text-center">식품 추가</h2>
        <FoodTagBox />
        <ShowDailyMealData />
      </div>
    </div>
  );
};
export default Modal;
