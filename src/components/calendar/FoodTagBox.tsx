'use client';

import { useContext, useEffect } from 'react';
import { SelectedDateContext } from './CalendarDateContext';
import useFetchDailyFoodTags from '@/hooks/useFetchDailyFoodTags';
import { Json } from '@/types/supabase';

interface FoodTagBoxBtnProps {
  modalMode: 'showData' | 'addData';
  onModalModeSwitch: () => void;
}
const FoodTagBoxBtn = ({ modalMode, onModalModeSwitch }: FoodTagBoxBtnProps) => {
  const btnMode = {
    showData: {
      onBtnClickFn: onModalModeSwitch,
      btnIcon: '+'
    },
    addData: { onBtnClickFn: () => {}, btnIcon: '...' }
  };
  const { onBtnClickFn, btnIcon } = btnMode[modalMode];

  return (
    <button onClick={onBtnClickFn} type="button" className="absolute top-[80%] left-[95%] text-bold hover:text-primary">
      <span className="fixed">{btnIcon}</span>
    </button>
  );
};

interface FoodTagItemtagDataType {
  amount: number;
  calendar_id: string;
  calorie: number;
  created_at: string;
  food_code: number;
  id: string;
  name: string;
  nutritions: Json;
  serving_size: string;
}

interface FoodTagItemProps {
  tagData: FoodTagItemtagDataType[];
  setSelectedFoodTag: (id: string) => void;
}

const FoodTagItem = ({ tagData, setSelectedFoodTag }: FoodTagItemProps) => {

  return (
    <>
      {tagData.map(({ id, name, amount }) => {
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
      })}
    </>
  );
};

interface FoodTagBoxProps {
  modalMode: 'showData' | 'addData';
  onModalModeSwitch: () => void;
  setSelectedFoodTag: (id: string) => void;
  setHowManyTags: (num:number) => void;
}
const FoodTagBox = ({ modalMode, onModalModeSwitch, setSelectedFoodTag, setHowManyTags }: FoodTagBoxProps) => {
  const dateContext = useContext(SelectedDateContext);
  const { selectedDate } = dateContext;
  const { year, month, day } = selectedDate;
  const { data: tagData, isPending, isError } = useFetchDailyFoodTags({ year, month, day });

  useEffect(() => {
    if (tagData) setHowManyTags(tagData.length);//태그데이터가 없다고 뜬다
  }, [tagData]);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  return (
    <section className="border-b">
      <div className="relative m-auto mb-4 w-4/5 h-28 border border-primary rounded-xl hide-scroll-y">
        <div className="p-4 flex flex-wrap gap-2">
          {tagData && tagData.length ? (
            <FoodTagItem tagData={tagData} setSelectedFoodTag={setSelectedFoodTag} />
          ) : (
            <div>아직 먹은 음식을 기록하지 않았어요</div>
          )}
        </div>
        <FoodTagBoxBtn modalMode={modalMode} onModalModeSwitch={onModalModeSwitch} />
      </div>
    </section>
  );
};

export default FoodTagBox;
