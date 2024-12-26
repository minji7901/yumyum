'use client';

import { Tables } from '@/types/supabase';
import { useContext, useEffect, useState } from 'react';
import { SelectedDateContext } from './CalendarDateContext';
import { getFoodTags } from '@/utils/calendar/getFoodTags';

interface FoodTagBoxProps {
  modalMode: string;
  onModalModeSwitch: () => void;
  setSelectedFoodTag: (id: string | null) => void;
}
const FoodTagBox = ({ modalMode, onModalModeSwitch, setSelectedFoodTag }: FoodTagBoxProps) => {
  //스크롤 넣기
  const dateContext = useContext(SelectedDateContext);
  const { selectedDate } = dateContext;
  const { year, month, day } = selectedDate;
  const userId = '19411c9c-bffa-4992-8f55-2c831d9cc941';
  const [tagData, setTagData] = useState<Tables<'consumed_foods'>[]>([]);

  useEffect(() => {
    const getTagData = async () => {
      try {
        const data = await getFoodTags({ year, month, day, userId });
        if (data) setTagData(data);
      } catch {
        return;//데이터가 단지 null일때에는 에러 메세지 안뜨게
      }
    };
    getTagData();
  }, []);
  //tanstack query로 최적화, 로딩일때 표시하기

  return (
    <section className="border-b">
      <div className="relative m-auto mb-4 w-4/5 h-28 border border-primary rounded-xl hide-scroll-y">
        <div className="p-4 flex flex-wrap gap-2">
          {tagData.length ? (
            tagData.map(({ id, name, amount }) => {
              const tagName = amount > 1 ? `${name} x${amount}` : name;
              return (
                <button
                  key={id}
                  type="button"
                  className="px-2 py-0.5 border-2 border-primary rounded-lg text-sm hover:bg-[#f2faed]"
                  onClick={() => {
                    setSelectedFoodTag(id);
                  }}
                >
                  {tagName}
                </button>
              );
            })
          ) : (
            <div>아직 먹은 음식을 기록하지 않았어요</div>
          )}
        </div>
        {modalMode === 'ShowData' ? (
          <button
            onClick={onModalModeSwitch}
            type="button"
            className="absolute top-[80%] left-[95%] text-bold hover:text-primary"
          >
            <span className="fixed">+</span>
          </button>
        ) : (
          <button type="button" className="absolute top-[80%] left-[95%] text-bold hover:text-primary">
            <span className="fixed">...</span>
          </button>
        )}
      </div>
    </section>
  );
};

export default FoodTagBox;
