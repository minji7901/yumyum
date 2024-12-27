'use client';

import { Tables } from '@/types/supabase';
import { useContext } from 'react';
import { SelectedDateContext } from './CalendarDateContext';
import useFetchDailyFoodConsumption from '@/hooks/useFetchDailyFoodConsumption';
import useFetchFoodTagData from '@/hooks/useFetchFoodTagData';
import { NutrientsJson } from '@/types/NutrientsJson';
import useDeleteFoodTag from '@/hooks/useDeleteFoodTag';

const FoodUnselected = () => {
  return (
    <>
      <div>음식 태그를 클릭하시면 영양정보를 볼 수 있습니다</div>
    </>
  );
};

interface FoodInfoBoxProps {
  selectedFood: Tables<'consumed_foods'>;
}
interface NutritionNamesType {
  [name: string]: string;
}
const FoodInfoBox = ({ selectedFood }: FoodInfoBoxProps) => {
  const dateContext = useContext(SelectedDateContext);
  const { selectedDate } = dateContext;
  const { year, month, day } = selectedDate;
  const { id: tagId, name, amount, nutritions, serving_size: servingSize } = selectedFood;

  const deleteTag = useDeleteFoodTag({ year, month, day, tagId });
  const nutritionsKRName: NutritionNamesType = {
    fat: '지방',
    carb: '탄수화물',
    sugar: '당류',
    natrium: '나트륨',
    protein: '단백질'
  };

  const nutritionInfo = { ...(nutritions as NutrientsJson) };
  const nutritionsArr = Object.entries(nutritionInfo);
  const calories = nutritionsArr.pop() ?? ['calories', 0];

  const foodName = amount > 1 ? `${name} x${amount}` : name;
  const foddCalories = calories[1] * amount;

  return (
    <>
      <div>
        <h3 className="mb-1 text-xl font-bold text-center">{foodName}</h3>
        <h4 className="text-lg font-bold text-center text-gray-400">{`${foddCalories}kcal`}</h4>
        <h4 className="text-xs font-bold text-center text-gray-400">{`1인분 ${servingSize}`}</h4>
      </div>
      <table className="m-auto mt-3 mb-6">
        <tbody>
          {nutritionsArr.map(([nutrition, quantity]) => {
            return (
              <tr key={nutrition}>
                <td className="text-right">{nutritionsKRName[nutrition]}</td>
                <td className="px-4 text-left">{`${quantity * amount}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        type="button"
        className="m-auto common-btn px-2 py-1 block"
        onClick={() => {
          deleteTag();
        }}
      >
        삭제
      </button>
    </>
  );
};

interface FoodInfoProps {
  selectedFoodTag: string;
}
const FoodInfo = ({ selectedFoodTag }: FoodInfoProps) => {
  const { data: selectedFood, isPending, isError } = useFetchFoodTagData(selectedFoodTag);
  if (selectedFoodTag === '') return <FoodUnselected />;

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  return <>{selectedFood ? <FoodInfoBox selectedFood={selectedFood} /> : <div>데이터를 가져올 수 없습니다</div>}</>;
};

interface ShowDailyMealDataProps {
  selectedFoodTag: string;
}
const ShowDailyMealData = ({ selectedFoodTag }: ShowDailyMealDataProps) => {
  const dateContext = useContext(SelectedDateContext);
  const { selectedDate } = dateContext;
  const { year, month, day } = selectedDate;

  const { data: foodConsumption, isPending, isError } = useFetchDailyFoodConsumption({ year, month, day });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  const totalCalories = foodConsumption ? foodConsumption['total_calories'] : '...';

  return (
    <>
      <div className="py-6 border-b">
        <FoodInfo selectedFoodTag={selectedFoodTag} />
      </div>
      <div className="my-5 ">
        <h3 className="mb-3 text-xl font-bold text-center">N월 N일의 하루 섭취 영양</h3>
        <div className="text-3xl font-bold text-center text-[#da6b5d]">{`${totalCalories}kcal`}</div>
      </div>
    </>
  );
};

export default ShowDailyMealData;
