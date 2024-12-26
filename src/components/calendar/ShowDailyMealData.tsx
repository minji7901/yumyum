'use client';

import { Tables } from '@/types/supabase';
import { getFoodTagById } from '@/utils/calendar/getFoodTags';
import { useEffect, useState } from 'react';

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
const FoodInfoBox = ({ selectedFood }: FoodInfoBoxProps) => {
  const { name, amount, nutritions, serving_size: servingSize } = selectedFood;
  const nutritionsKRName = { fat: '지방', carb: '탄수화물', sugar: '당류', natrium: '나트륨', protein: '단백질' };
  
  const nutritionInfo = { ...nutritions };
  delete nutritionInfo.calories;
  const nutritionsArr = Object.entries(nutritionInfo);
  const foodName = amount > 1 ? `${name} x${amount}` : name;
  return (
    <>
      <div>
        <h3 className="mb-1 text-xl font-bold text-center">{foodName}</h3>
        <h4 className="text-lg font-bold text-center text-gray-400">{`${nutritions.calories * amount}kcal`}</h4>
        <h4 className="text-xs font-bold text-center text-gray-400">{`1인분 ${servingSize}`}</h4>
      </div>
      <table className="m-auto mt-3 mb-6">
        <tbody>
          {nutritionsArr.map(([nutrition, quantity]) => (
            <tr key={nutrition}>
              <td className="text-right">{nutritionsKRName[nutrition]}</td>
              <td className="px-4 text-left">{`${quantity}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" className="m-auto common-btn px-2 py-1">
        삭제
      </button>
    </>
  );
};

interface FoodInfoProps {
  selectedFoodTag: string | null;
}
const FoodInfo = ({ selectedFoodTag }: FoodInfoProps) => {
  const [selectedFood, setSelectedFood] = useState<Tables<'consumed_foods'> | null>(null);

  useEffect(() => {
    const fetchFoodInfo = async () => {
      try {
        if (!selectedFoodTag) return;
        const foodData = await getFoodTagById(selectedFoodTag);
        setSelectedFood(foodData);
      } catch {
        return;
      }
    };
    fetchFoodInfo();
  }, [selectedFoodTag]);

  return <>{selectedFood ? <FoodInfoBox selectedFood={selectedFood} /> : <FoodUnselected />}</>;
};

interface ShowDailyMealDataProps {
  selectedFoodTag: string | null;
}
const ShowDailyMealData = ({ selectedFoodTag }: ShowDailyMealDataProps) => {
  const testData = { totalCalories: 1000 };
  const { totalCalories } = testData;
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
