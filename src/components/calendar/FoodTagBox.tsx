'use client';

import { useContext } from 'react';
import { SelectedDateContext } from './CalendarDateContext';
import useFetchDailyFoodTags from '@/hooks/useFetchDailyFoodTags';
interface FoodTagBoxProps {
  modalMode: string;
  onModalModeSwitch: () => void;
  setSelectedFoodTag: (id: string) => void;
}
const FoodTagBox = ({ modalMode, onModalModeSwitch, setSelectedFoodTag }: FoodTagBoxProps) => {
  const dateContext = useContext(SelectedDateContext);
  const { selectedDate } = dateContext;
  const { year, month, day } = selectedDate;
  const { data: tagData, isPending, isError } = useFetchDailyFoodTags({ year, month, day });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  return (
    <section className="border-b">
      <div className="relative m-auto mb-4 w-4/5 h-28 border border-primary rounded-xl hide-scroll-y">
        <div className="p-4 flex flex-wrap gap-2">
          {tagData && tagData.length ? (
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
