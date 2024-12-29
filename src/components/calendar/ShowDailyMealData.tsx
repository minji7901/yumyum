'use client';

import { useContext } from 'react';
import { SelectedDateContext } from './CalendarDateContext';
import useFetchDailyFoodConsumption from '@/hooks/useFetchDailyFoodConsumption';
import useFetchFoodTagData from '@/hooks/useFetchFoodTagData';
import FoodInfoBox from './FoodInfoBox';

const FoodUnselected = () => {
  return (
    <>
      <div>음식 태그를 클릭하시면 영양정보를 볼 수 있습니다</div>
    </>
  );
};

interface FoodInfoProps {
  selectedFoodTag: string;
  howManyTags: number;
}
const FoodInfo = ({ selectedFoodTag, howManyTags }: FoodInfoProps) => {
  const { data: selectedFood, isPending, isError } = useFetchFoodTagData(selectedFoodTag);
  if (selectedFoodTag === '') return <FoodUnselected />;

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  return (
    <>
      {selectedFood ? (
        <FoodInfoBox selectedFood={selectedFood} howManyTags={howManyTags} />
      ) : (
        <div>태그가 성공적으로 삭제되었어요</div>
      )}
    </>
  );
};

interface ShowDailyMealDataProps {
  selectedFoodTag: string;
  howManyTags: number;
}
const ShowDailyMealData = ({ selectedFoodTag, howManyTags }: ShowDailyMealDataProps) => {
  const { selectedDate } = useContext(SelectedDateContext);
  const { year, month, day } = selectedDate;

  const { data: foodConsumption, isPending, isError } = useFetchDailyFoodConsumption({ year, month, day });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  const totalCalories = foodConsumption ? foodConsumption['total_calories'] : '...';

  return (
    <>
      <div className="py-6 border-b">
        <FoodInfo selectedFoodTag={selectedFoodTag} howManyTags={howManyTags} />
      </div>
      <div className="my-5 ">
        <h3 className="mb-3 text-xl font-bold text-center">{`${year}년 ${month}월 ${day}일의 하루 섭취 영양`}</h3>
        <div className="text-3xl font-bold text-center text-[#da6b5d]">{`${totalCalories}kcal`}</div>
      </div>
    </>
  );
};

export default ShowDailyMealData;
