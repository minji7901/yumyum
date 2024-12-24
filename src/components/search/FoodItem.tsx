'use client';
import { FoodType } from '@/types/Food';
import { formatNutrients } from '@/utils/formatNutrients';

interface FoodItemProps {
  data: FoodType;
}

const FoodItem = ({ data }: FoodItemProps) => {
  const amount = `${parseInt(data.Z10500)}g`;
  const kcal = `${Math.floor((parseInt(data.Z10500) / 100) * parseInt(data.AMT_NUM1))}kcal`;

  return (
    <div className="flex flex-col gap-2 p-5 border-b border-primary">
      <p className="font-bold">
        {data.FOOD_NM_KR} <span className="text-sm text-gray-400">{amount}</span>
      </p>
      <p className="text-primary">{kcal}</p>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {Object.entries(data).map(
          ([key, value]) =>
            formatNutrients(key).name && (
              <p key={key}>{`${formatNutrients(key).name} ${value}${formatNutrients(key).unit}`}</p>
            )
        )}
      </div>
    </div>
  );
};

export default FoodItem;
