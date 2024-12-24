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
    <div className="my-10">
      <p>{data.FOOD_NM_KR}</p>
      <p>
        {kcal} {amount}
      </p>
      <div>
        {Object.entries(data).map(
          ([key, value]) =>
            formatNutrients(key).name && (
              <span key={key} className="mr-4">
                {`${formatNutrients(key).name} : ${value}${formatNutrients(key).unit}`}
              </span>
            )
        )}
      </div>
    </div>
  );
};

export default FoodItem;
