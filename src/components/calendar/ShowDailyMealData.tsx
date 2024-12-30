'use client';

import { useContext } from 'react';
import { SelectedDateContext } from './CalendarDateContext';
import useFetchDailyFoodConsumption from '@/hooks/useFetchDailyFoodConsumption';
import useFetchFoodTagData from '@/hooks/useFetchFoodTagData';
import FoodInfoBox from './FoodInfoBox';

const FoodUnselected = () => {
  return (
    <div className="h-[14rem] flex justify-center items-center">
      <span>음식 태그를 클릭하시면 영양정보를 볼 수 있습니다</span>
    </div>
  );
};

interface FoodInfoProps {
  selectedFoodTag: string;
  howManyTags: number;
  setHowManyTags: (num: number) => void;
}
const FoodInfo = ({ selectedFoodTag, howManyTags, setHowManyTags }: FoodInfoProps) => {
  const { data: selectedFood, isPending, isError } = useFetchFoodTagData(selectedFoodTag);
  if (selectedFoodTag === '') return <FoodUnselected />;

  if (isPending)
    return (
      <div className="h-[16rem] flex justify-center items-center">
        <span>Loading...</span>
      </div>
    );
  if (isError)
    return (
      <div className="h-[16rem] flex justify-center items-center">
        <span>Error!</span>
      </div>
    );

  return (
    <>
      {selectedFood ? (
        <FoodInfoBox selectedFood={selectedFood} howManyTags={howManyTags} setHowManyTags={setHowManyTags} />
      ) : (
        <div className="h-[16rem] flex justify-center items-center">
          <span>태그가 성공적으로 삭제되었어요</span>
        </div>
      )}
    </>
  );
};

interface ShowDailyMealDataProps {
  selectedFoodTag: string;
  howManyTags: number;
  setHowManyTags: (num: number) => void;
}
const ShowDailyMealData = ({ selectedFoodTag, howManyTags, setHowManyTags }: ShowDailyMealDataProps) => {
  const { selectedDate } = useContext(SelectedDateContext);
  const { year, month, day } = selectedDate;

  const { data: foodConsumption, isPending, isError } = useFetchDailyFoodConsumption({ year, month, day });

  if (isPending)
    return (
      <div className="h-[16rem] flex justify-center items-center">
        <span>Loading...</span>
      </div>
    );
  if (isError)
    return (
      <div className="h-[16rem] flex justify-center items-center">
        <span>Error!</span>
      </div>
    );

  const totalCalories = foodConsumption ? foodConsumption['total_calories'] : '...';

  return (
    <>
      <div className="py-6 border-b">
        <FoodInfo selectedFoodTag={selectedFoodTag} howManyTags={howManyTags} setHowManyTags={setHowManyTags} />
      </div>
      <div className="my-3 ">
        <h3 className="mb-3 text-base font-bold text-center">{`${year}년 ${month}월 ${day}일의 하루 섭취 영양`}</h3>
        <div className="text-xl font-bold text-center text-[#da6b5d]">{`${totalCalories}kcal`}</div>
      </div>
    </>
  );
};

export default ShowDailyMealData;
